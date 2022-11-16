//
//  PoseRecognitionModule.m
//  Vision
//
//  Created by Олег on 08.11.2022.
//
#import "RCTPoseDetectionModule.h"
#import <React/RCTLog.h>

@import MLKit;


@implementation RCTPoseDetectionModule

RCT_EXPORT_MODULE(PoseDetectionModule);

- (NSMutableDictionary *)getCoordsDictionary:(MLKVision3DPoint *)position {
  NSMutableDictionary *coordsDictionary = [NSMutableDictionary dictionary];
  
  [coordsDictionary setValue:[NSNumber numberWithFloat:position.x] forKey:@"x"];
  [coordsDictionary setValue:[NSNumber numberWithFloat:position.y] forKey:@"y"];
  [coordsDictionary setValue:[NSNumber numberWithFloat:position.z] forKey:@"z"];
  
  return  coordsDictionary;
}

RCT_EXPORT_METHOD(recognizeImage:(NSString *)url
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  MLKAccuratePoseDetectorOptions *options =
      [[MLKAccuratePoseDetectorOptions alloc] init];
  options.detectorMode = MLKPoseDetectorModeSingleImage;
  
  MLKPoseDetector *poseDetector =
      [MLKPoseDetector poseDetectorWithOptions:options];
  
  NSURL *imageUrl = [NSURL URLWithString:url];
  NSData *imageData = [NSData dataWithContentsOfURL:imageUrl];
  UIImage *image = [[UIImage alloc] initWithData:imageData];
  
  MLKVisionImage *visionImage = [[MLKVisionImage alloc] initWithImage:image];
  visionImage.orientation = image.imageOrientation;
  
  NSError *error;
  NSArray *poses = [poseDetector resultsInImage:visionImage error:&error];
  
  if (error != nil) {
    // Error.
    reject(@"pose_recognition", @"pose recognition failed", nil);
    return;
  }
  
  NSMutableDictionary *response = [NSMutableDictionary dictionary];
  
  for (MLKPose *pose in poses) {
    for(MLKPoseLandmark *poseLandmark in pose.landmarks){
      [response setValue:[self getCoordsDictionary:poseLandmark.position] forKey:poseLandmark.type];
    }
  }
  
  resolve(response);
}

@end
