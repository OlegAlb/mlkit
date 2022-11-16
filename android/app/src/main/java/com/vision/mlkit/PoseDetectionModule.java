package com.vision.mlkit;

import android.net.Uri;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.mlkit.vision.common.InputImage;
import com.google.mlkit.vision.common.PointF3D;
import com.google.mlkit.vision.pose.Pose;
import com.google.mlkit.vision.pose.PoseDetection;
import com.google.mlkit.vision.pose.PoseDetector;
import com.google.mlkit.vision.pose.PoseLandmark;
import com.google.mlkit.vision.pose.accurate.AccuratePoseDetectorOptions;

import java.io.IOException;
import java.util.List;

public class PoseDetectionModule extends ReactContextBaseJavaModule {
    PoseDetectionModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "PoseDetectionModule";
    }

    public WritableMap getCoordsMap(PointF3D point){
        WritableMap coordsObject = Arguments.createMap();

        coordsObject.putDouble("x", point.getX());
        coordsObject.putDouble("y", point.getY());
        coordsObject.putDouble("z", point.getZ());

        return  coordsObject;
    }

    @ReactMethod
    public void recognizeImage(String url, Promise promise) {
        Uri uri = Uri.parse(url);
        InputImage image;
        try {
            image = InputImage.fromFilePath(getReactApplicationContext(), uri);

            AccuratePoseDetectorOptions options =
                    new AccuratePoseDetectorOptions.Builder()
                            .setDetectorMode(AccuratePoseDetectorOptions.SINGLE_IMAGE_MODE)
                            .build();
            PoseDetector poseDetector = PoseDetection.getClient(options);

            Task<Pose> result =
                    poseDetector.process(image)
                            .addOnSuccessListener(
                                    new OnSuccessListener<Pose>() {
                                        @Override
                                        public void onSuccess(Pose pose) {
                                            List<PoseLandmark> allPoseLandmarks = pose.getAllPoseLandmarks();

                                            WritableMap response = Arguments.createMap();

                                            for(PoseLandmark poseLandmark: allPoseLandmarks){
                                                response.putMap(Integer.toString(poseLandmark.getLandmarkType()), getCoordsMap(poseLandmark.getPosition3D()));
                                            }

                                            promise.resolve(response);
                                        }
                                    })
                            .addOnFailureListener(
                                    new OnFailureListener() {
                                        @Override
                                        public void onFailure(@NonNull Exception e) {
                                            promise.reject("Detect Pose Error", e);
                                        }
                                    });


        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
