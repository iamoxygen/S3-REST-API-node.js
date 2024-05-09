
# API Documentation

This document provides information about the S3 CRUD Opertions API endpoints and their usage. The CRUD in S3 allows users to interact with buckets, including listing all buckets, uploading, fetching, deleteting Objects.

### Base URL
All endpoints mentioned in this document have the base URL:

######  
    {{Host}}/api     

Replace `{{Host}}` with the appropriate host name.

### Endpoints:
#### Bucket
- List All Buckets

######  
    GET /api/bucket/list

This endpoint retrieves a paginated list of all buckets.

#### Parameters
- page: (*optional*) Page number for pagination. Default is 1.
- limit: (*optional*) Number of items per page. Default is 10.

#### Response
![image](https://github.com/iamoxygen/S3-REST-API-node.js/assets/43597178/af83665c-ade2-4bb1-bace-680d2296405e)

<br>
<br>
<br>


#### Objects

- List All Object in Bucket

######  
    GET /api/object/list

This endpoint retrieves a paginated list of all object from S3 and database.

#### Parameters
- page: (*optional*) Page number for pagination. Default is 1.
- limit: (*optional*) Number of items per page. Default is 10.
- bucketName: (*required*) The name of the bucket.
- from: (*required*) Source of objects. Can be either "db" or "s3".

######
    GET {{Host}}/api/object/list?bucketName=myBucket&page=1&limit=20&from=db
    
#### Response
![image](https://github.com/iamoxygen/S3-REST-API-node.js/assets/43597178/84b895dc-c22b-45aa-af5d-dbd420e97882)


<br>
<br> 


- Get Object from S3 Bucket

######  
    GET /api/object/get

This endpoint retrieves a single object from S3 and database.

#### Parameters
- key: (*required*) to retrieves file from s3.
- bucketName: (*required*) The name of the bucket.
- from: (*required*) Source of objects. Can be either "db" or "s3".

######
    GET {{Host}}/api/object/get?bucketName=myBucket&key=mykey&from=db

#### Response
######
    stream respones

<br>
<br> 


- Upload Object in S3 Bucket

######  
    POST /api/object/upload

This endpoint upload object into S3 Bucket and Database.

#### Body
- files: (*required*) to save file in s3 and database.

#### Parameters
- bucketName: (*required*) The name of the bucket.

######
    POST {{Host}}/api/object/upload?bucketName=myBucket&key=mykey&from=db

<br>
<br> 

#### Response
![image](https://github.com/iamoxygen/S3-REST-API-node.js/assets/43597178/965982d6-8209-435e-a91d-49fcfda0e06b)

- Delete Object from S3 Bucket

######  
    DELETE /api/object/delete

This endpoint Delete Object from S3 Bucket and Database.

#### Parameters
- bucketName: (*required*) The name of the bucket.

######
    DELETE {{Host}}/api/object/delete?bucketName=myBucket&key=mykey

#### Response
![image](https://github.com/iamoxygen/S3-REST-API-node.js/assets/43597178/35e97040-e55a-482f-9311-f3285e5508e5)


