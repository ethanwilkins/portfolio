const express = require('express');
const router = new express.Router();
const crypto = require('crypto');
const request = require('request');
const appRoot = require('app-root-path');
const fs = require('fs');
const os = require('os');

const User = require('../models/userModel');

router.get('/:name/followers', async (req, res) => {
  const { name } = req.params;
  const domain = req.hostname;
  try {
    const user = await User.findOne({ name: name }).exec();
    if (!user) {
      return res.status(404).json({
        message: `No record found for ${name}`
      });
    }
    else {
      user.actorFollowers = user.actorFollowers || '[]';
      let followers = JSON.parse(user.actorFollowers);
      let followersCollection = {
        "type": "OrderedCollection",
        "totalItems": followers.length,
        "id": `https://${domain}/u/${name}/followers`,
        "first": {
          "type": "OrderedCollectionPage",
          "totalItems": followers.length,
          "partOf": `https://${domain}/u/${name}/followers`,
          "orderedItems": followers,
          "id":`https://${domain}/u/${name}/followers?page=1`
        },
        "@context":["https://www.w3.org/ns/activitystreams"]
      };
      return res.json(followersCollection);
    }
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong.'
    });
  }
});

router.get('/:name', async (req, res) => {
  const { name } = req.params;

  try {
    const user = await User.findOne({ name: name }).exec();
    if (!user) {
      return res.status(404).json({
        message: `No record found for ${name}`
      });
    }
    else {
      return res.json(JSON.parse(user.actor));
    }
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong.'
    });
  }
});

router.get('/webfinger/:resource', async (req, res) => {
  const { resource } = req.params;
  const name = resource.match(/:(.*)@/).pop();

  try {
    const user = await User.findOne({ name: name }).exec();
    if (!user) {
      return res.status(404).json({
        message: `No record found for ${name}`
      });
    }
    else {
      return res.json(JSON.parse(user.webFinger));
    }
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong.'
    });
  }
});

// POST to actors/inbox will come in as /api/inbox
router.post('/inbox', async (req, res) => {
  // pass in a name for an account, if the account doesn't exist, create it!
  const domain = req.hostname;

  // Skipping assignment for testing
  if (req.body.actor) {
    const myURL = new URL(req.body.actor);
    const targetDomain = myURL.hostname;
  }

  try {
    // Outputs request body for testing
    let writer = fs.createWriteStream(`${appRoot}/backend/logs/postInboxOutput.json`, {flags:'a'});
    if (req.body.actor) {
      writer.write(JSON.stringify(req.body) + os.EOL.repeat(2));
    }
    else {
      writer.write("No request body was sent." + os.EOL.repeat(2));
    }

    // TODO: add "Undo" follow event
    if (typeof req.body.object === 'string' && req.body.type === 'Follow') {
      let name = req.body.object.replace(`https://${domain}/u/`,'');
      sendAcceptMessage(req.body, name, domain, req, res, targetDomain);
      // Add the user to the DB of accounts that follow the account
      User.findOne({name: name})
        .then(user => {
          // update followers
          let followers = parseJSON(user.actorFollowers);
          if (followers) {
            followers.push(req.body.actor);
            // unique items
            followers = [...new Set(followers)];
          }
          else {
            followers = [req.body.actor];
          }
          let followersText = JSON.stringify(followers);
          user.actorFollowers = followersText;
          user.save(err => console.log(err));
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong. (a)'
    });
  }
});

async function signAndSend(message, name, domain, req, res, targetDomain) {
  // get the URI of the actor object and append 'inbox' to it
  let inbox = message.object.actor+'/inbox';
  let inboxFragment = inbox.replace('https://'+targetDomain,'');
  try {
    // get the private key
    let user = await User.findOne({ name: name }).exec();
    if (!user) {
      return res.status(404).send(`No record found for ${name}.`);
    }
    else {
      let privateKey = user.privateKey;
      const signer = crypto.createSign('sha256');
      let d = new Date();
      let stringToSign = `(request-target): post ${inboxFragment}\nhost: ${targetDomain}\ndate: ${d.toUTCString()}`;
      signer.update(stringToSign);
      signer.end();
      const signature = signer.sign(privateKey);
      const signature_b64 = signature.toString('base64');
      let header = `keyId="https://${domain}/u/${name}",headers="(request-target) host date",signature="${signature_b64}"`;

      // Was able to get here

      if (header) {
        return res.status(200).json({
          message: 'Got this far.',
          output: {
            inbox: inbox,
            targetDomain: targetDomain,
            date: d.toUTCString(),
            message: message,
            header: header
          }
        });
      }

      const result = await request({
        url: inbox,
        headers: {
          'Host': targetDomain,
          'Date': d.toUTCString(),
          'Signature': header
        },
        method: 'POST',
        json: true,
        body: message
      });

      console.log(result);
      return res.status(200);
    }
  } catch(err) {
      return res.status(500).json({
        message: `Something went wrong. (${test})`
      });
  }
}

function sendAcceptMessage(thebody, name, domain, req, res, targetDomain) {
  const guid = crypto.randomBytes(16).toString('hex');
  let message = {
    '@context': 'https://www.w3.org/ns/activitystreams',
    'id': `https://${domain}/${guid}`,
    'type': 'Accept',
    'actor': `https://${domain}/u/${name}`,
    'object': thebody,
  };
  signAndSend(message, name, domain, req, res, targetDomain);
}

function parseJSON(text) {
  try {
    return JSON.parse(text);
  } catch(e) {
    return null;
  }
}

module.exports = router;
