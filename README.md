<!-- Using SST to upload Next.js to AWS S3 and CloudFront -->

To learn AWS, I initially wanted to just make a static site with vanilla HTML and CSS, but because I think Next.js will be ubiquitous in the future, I wanted to get ahead by learning how to deploy based on my own infrastructure. Doing so will be a great cost-saving tool in the future as I no longer have to rely on Vercel to host my sites. Besides, Vercel uses AWS under the hood anyway so removing that abstraction ultimately leads to the same result. Although, I'm hoping site speed and performance improves when self-deploying.

Going through the SST docs was overall a straightforward experience. There was a lot of setup required on the AWS end to replicate a real-world workflow such as creating my IAM management account and then using AWS organizations to extend my permissions into -dev and -production accounts. This was followed by setting up email aliases for aforementioned three IAMs and have them route to my main email. Perhaps this is not necessary when working alone, but definitely valuable in a team environment. CloudFlare has a great email forwarding service.

Setting up the AWS CLI was also relatively easy too. After setting up the IAMs, I needed to head over to ~/.aws to setup my configurations and credentials. I couldn't get paste to work in nano so I had to hand-type all of the keys which was quite tedious but not too bad. Since I used WSL, I had to create a script aws-login.sh to let me open a window in my host browser.

SST has been great thus far. It knows to upload static assets to S3 and then serve with CLoudFront while deploying SSR + API routes to AWS Lambda functions behind an API Gateway. This ensures dynamic requests are processed in real time.
