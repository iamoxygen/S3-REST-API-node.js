
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

#### Objects

- List All Object in Bucket

######  
    GET /api/object/list

This endpoint retrieves a paginated list of all buckets.

#### Parameters
- page: (*optional*) Page number for pagination. Default is 1.
- limit: (*optional*) Number of items per page. Default is 10.
- bucketName: (*required*) The name of the bucket.
- from: (*required*) Source of objects. Can be either "db" or "s3".

######
    GET {{Host}}/api/object/list?bucketName=myBucket&page=1&limit=20&from=db

<br> 
- Get Object from S3 Bucket

######  
    GET /api/object/get

This endpoint retrieves a paginated list of all buckets.

#### Parameters
- key: (*required*) to retrieves file from s3.
- bucketName: (*required*) The name of the bucket.
- from: (*required*) Source of objects. Can be either "db" or "s3".

######
    GET {{Host}}/api/object/get?bucketName=myBucket&key=mykey&from=db

- Upload Object in S3 Bucket

######  
    POST /api/object/upload

This endpoint retrieves a paginated list of all buckets.

#### Body
- files: (*required*) to save file in s3 and database.

#### Parameters
- bucketName: (*required*) The name of the bucket.

######
    POST {{Host}}/api/object/upload?bucketName=myBucket&key=mykey&from=db


- Delete Object from S3 Bucket

######  
    DELETE /api/object/delete

This endpoint retrieves a paginated list of all buckets.

#### Parameters
- bucketName: (*required*) The name of the bucket.

######
    DELETE {{Host}}/api/object/delete?bucketName=myBucket&key=mykey

