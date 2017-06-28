aws s3 cp index.html s3://www.myshyft.com --profile default
aws s3 cp privacy.html s3://www.myshyft.com --profile default
aws s3 cp terms.html s3://www.myshyft.com --profile default
aws s3 cp terms-app.html s3://www.myshyft.com --profile default
aws s3 cp old-navy-privacy.html s3://www.myshyft.com --profile default
aws s3 sync static s3://www.myshyft.com/static --profile default
aws s3 sync business s3://www.myshyft.com/business --profile default
