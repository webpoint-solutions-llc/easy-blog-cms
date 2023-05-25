import { CompletedPart, ObjectCannedACL } from '@aws-sdk/client-s3';

export interface IAwsS3 {
    path: string;
    pathWithFilename: string;
    filename: string;
    completedUrl: string;
    baseUrl: string;
    mime: string;
    originalFileName: string;
    createdDate: Date;
    uploadedBy?: string;
    alt?: string;
    title?: string;
    description?: string;
    dimension?: {
        height: number;
        width: number;
    };
    size?: number;
}

export interface IAwsS3MultiPart {
    path: string;
    uploadId: string;
    partNumber?: number;
    maxPartNumber?: number;
    parts?: CompletedPart[];
    pathWithFilename: string;
    filename: string;
    completedUrl: string;
    baseUrl: string;
    mime: string;
}

export interface IAwsS3PutItemOptions {
    path: string;
    originalFileName: string;
    acl?: ObjectCannedACL;
}
