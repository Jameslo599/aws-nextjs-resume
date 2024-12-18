-- Using SST to upload Next.js to AWS S3 and CloudFront --

To learn AWS, I initially wanted to just make a static site with vanilla HTML and CSS, but because I think Next.js will be ubiquitous in the future, I wanted to get ahead by learning how to deploy based on my own infrastructure. Doing so will be a great cost-saving tool in the future as I no longer have to rely on Vercel to host my sites. Besides, Vercel uses AWS under the hood anyway so removing that abstraction ultimately leads to the same result. Although, I'm hoping site speed and performance improves when self-deploying.

Going through the SST docs was overall a straightforward experience. There was a lot of setup required on the AWS end to replicate a real-world workflow such as creating my IAM management account and then using AWS organizations to extend my permissions into -dev and -production accounts. This was followed by setting up email aliases for aforementioned three IAMs and have them route to my main email. Perhaps this is not necessary when working alone, but definitely valuable in a team environment. CloudFlare has a great email forwarding service.

Setting up the AWS CLI was also relatively easy too. After setting up the IAMs, I needed to head over to ~/.aws to setup my configurations and credentials. I couldn't get paste to work in nano so I had to hand-type all of the keys which was quite tedious but not too bad. Since I used WSL, I had to create a script aws-login.sh to let me open a window in my host browser.

SST has been great thus far. It knows to upload static assets to S3 and then serve with CLoudFront while deploying SSR + API routes to AWS Lambda functions behind an API Gateway. This ensures dynamic requests are processed in real time.

Setup a custom domain awsjameslo.com by first purchasing a domain name on PorkBun which offers the lowest prices as of present (12/06/2024). I then created a hosted zone with AWS Route 53 and requested a public SSL using AWS Certificate Manager. Route 53 is a pretty cost effective way to handle DNS routing at only 0.50 cents per month. However, there are free alternatives like Cloudflare. I created Route 53 records using my new SSL and then added custom CName and SSL to CloudFront. Finally, I directed traffic to CloudFront by creating an A record with an alias. Implementation was fine but I noticed an error "ERR_SSL_VERSION_OR_CIPHER_MISMATCH" when accessing custom domain from desktop. I tested the SSL using SSL Labs and accessed on mobile iOS + MacBook. Both worked without issue. I deleted cookies and cache but that did not help. Issue eventually resolved itself, which most likely is related to DNS propagation.

Used TypeScript to implement a Counter component that will make an API call to get the total visitor count number and display it on the frontend.

To prevent DNS spoofing ("main-in-the-middle") attacks, I configured DNSSEC on Route 53 by creating a key-signing key (KSK) using AWS KMS and using the key to establish a chain of trust with my domain registrar PorkBun. I am still figuring out automation of key rotation, but for now I will use the double-RR method to rotate my keys every 90 days.

-- Visitor Counter --

To implement a visitor counter on the site, I used DynamoDB to create a table 'cloud-resume-visitors' with the partition key 'website_name' and sort key 'website_id'. Next, I added the 'total_visitors' property to track the total number of site visitors. I utilized AWS Lambda to create a python function that will increment the incoming requests's 'total_visitors' value by one and update the 'cloud-resume-visitors' table in DynamoDB. This was great, however the Lambda function did not have permissions to modify the table so I had to create a new Role in IAM with the DynamoDBFullAccess policy and assign it to my function.

To trigger the function externally, I setup an Amazon-managed API Gateway and opted for the REST API for full control over my endpoints. Once connected to my Lambda function, I tested the endpoint using the API Gateway console, deployed api and then tested again with Postman. It was easy to setup the PUT request as I could send event data through the request body. However, when setting up the GET request to obtain the counter value, I did not have a body tag to work with so I needed to enable Lambda proxy integration to transform my method request into a standard http request. Doing so caused an internal server error but I realized this was because the response needed to be returned in a specific format.

The default API endpoint was quite verbose and hard to read so I opted to setup a custom domain api.awsjameslo.com to remedy these problems. Doing so was straightforward and I just had to request a new ACM and verify by creating records in Route53. Since this subdomain belonged to the root domain, I didn't need to pay extra for a second managed DNS host. Then I just had to create a new A record that pointed to API Gateway API and my new custom endpoints were valid.

Now it was time to connect the frontend to backend. I created a Counter component using TypeScript which makes two API calls upon initialization: one to getCounter and then one to incrementCounter. Since I already tested my endpoints using AWS web console and Postman, I didn't have to repeat that here. After deploying to production, I noticed the app counter was not updating nor making the API calls. Since it worked locally, I thought it could have been a CORS issue but I enabled it previously. The next suspicion was S3 caching so I performed an invalidation and that didn't fix the issue. I also checked my API gateway but I didn't enable cache provisioning. Since Next.js uses 'no cache' by default, I thought it was working as intended, but I decided to change the caching to 'no store' instead and the bug was fixed.

I later opted to change the Counter component to use client-side rendering for learning and innovation. Figuring out CORS with CSR took some time but I ended up learning which headers and formatting is needed when returning responses using lambda proxy. The big error that took me so long to resolve was that my except statement was not returning the proper headers. This caused my entire code to fail for any method other than GET.

-- CI/CD Pipeline --
In order to implement CI/CD with Github Actions for SST, there was some scripting involved where I had to remove aws profiles in favor of environment variables. This also brought up an issue where I originally used sso to obtain authentication in the aws CLI but since that could not be automated I had to find an alternative. The solution turned out to be including the same access id and secret, but also the session token and these three combined with default region us-east-1 bypassed the need to use sso. It was quite gratifying to implement this feature!

I later realized IAM environment variables are rotated every 12 hours so to create a more automated and dynamic pipeline, I implemented OpenID Connect (OIDC) by creating an IAM role for Github with AdminAccess to assume the role during the workflow. Then I added "Configure AWS Credentials" Action for GitHub Actions in my workflow which handles authentication by obtaining short-lived credentials for each deployment.

-- Using AWS RDS Postgres --
For a more cost-effective solution or if a SQL DB is preferred, I also implemented AWS RDS Postgres as an option. Since Postgres is not a fully managed, serverless database provided by AWS and cannot take advantage of IAM permissions, I set up a Virtual Private Cloud (VPC) with two public subnets, a routing table and a internet gateway. I then created a security group to only allow inbound traffic from other members of the same security group. The RDS Postgres was set up and included in the security group. I definitely had to brush up on my SQL since there isn't a web console to create tables unlike with DynamoDB. I then created two Lambda functions with same functionality as the previously created ones. I spend much time writing my own functions locally and learning how to compress and upload it to AWS. I had trouble finding the right psycopg2 package and finally found the right one using psycopg2-binary. The difference was that I needed to include environment variables in the lambda function in order to connect to the database. This is also where AWS Secrets Manager was used in conjunction with RDS proxy to create a more secure method of storing my host endpoint versus storing it as an env variable. I huge challenge I had with this feature was error handling. I wrote a very general error message of 'Database could not be connected' which displayed even though I was connected but had a syntax error. Therefore I spent a lot of time debugging the wrong issue.

-- CloudWatch Alarms --
To monitor my applications, I setup three alarms: one for high API gateway latency and two for excessive Lambda invocations and errors within a time-frame. I really like the UI for this feature and it's amazing how generous Amazon is with their free-tier. I used AWS SNS to email me when the alarms are in alert mode which I tested successfully.
