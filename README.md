# Tweeting photos with a Raspberry Pi 2 using Node.js

This is a simple code sample that shows one way of snapping a photo with an attached camera, saving it to local and remote storage, as well as Tweeting the result.

# Why this?

I wanted to see if I could use my Raspberries for something mildly entertaining and figure out how it would be possible to use a technology such as Node.js to accomplish it.

# What do you need?

1: A Raspberry Pi 2
2: Raspbian
3: An fswebcam compatible USB webcam (you need to verify that fswebcam can run without sudo/root privileges. This may take an additional modification of UDEV rules to ensure the camera device is shared properly.)
4: A mounted folder that's connected to a Samba share (optional, you can comment that section of the code out if you're not interested in this)
5: A Twitter account and a registered app (this is also optional, if you don't want to tweet anything)
6a: Node v7.x (...is what I'm using. It probably works with earlier versions as well)
6b: Node rpm package: node-webcam
6c: Node rpm package: twitter
6d: Node rpm package: smb2
7: A clone of this repository, where you've edited app.js, replacing paths and inserting Twitter credentials

After all that, you should be able to successfully run this by executing: node app.js
