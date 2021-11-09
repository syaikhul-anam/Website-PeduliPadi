from __future__ import division, print_function

# coding=utf-8
import sys
import os
import glob
import re
import numpy as np


# Keras 
from keras.models import load_model
from keras.preprocessing.image import img_to_array
from keras.preprocessing.image import load_img

# Flask utils
from flask import Flask, redirect, url_for, request, render_template
from keras.models import load_model
from keras.preprocessing import image
from werkzeug.utils import secure_filename
#from gevent.pywsgi import WSGIServer

#define a flask app
app = Flask(__name__)

# Model saved with Keras model.save()
MODEL_PATH = 'model-1.h5'
MODEL_PATH_2 = 'model-2.h5'

# Load your trained model
model = load_model(MODEL_PATH)
model_2 = load_model(MODEL_PATH_2)
print('Model loaded. Check http://127.0.0.1:5000/')

# Model-1
def model_predict(img_path, model):
    pict = image.load_img(img_path, target_size=(224, 224))
    # Preprocessing the image
    Y = image.img_to_array(pict)
    # Be careful how your trained model deals with the input
    # otherwise, it won't make correct prediction!
    Y = Y/255
    proba = model.predict(Y.reshape(1, 224, 224, 3))
    return proba

# Model-2
def model_predict_2(img_path, model_2):
    img = image.load_img(img_path, target_size=(224, 224))
    # Preprocessing the image
    z = image.img_to_array(img)
    # Be careful how your trained model deals with the input
    # otherwise, it won't make correct prediction!
    z = z/255
    proba_2 = model_2.predict(z.reshape(1, 224, 224, 3))
    return proba_2

#create an instance of Flask
@app.route('/',methods=['GET'])
def home():
    #main page
    return render_template('index.html')

@app.route('/condition',methods=['GET'])
def condition():
    #predict page
    return render_template('condition.html')

#process predict
@app.route("/predict", methods=['POST','GET'])
def upload():

    if request.method == 'POST':
        # Get the file from post request
        f = request.files['file']
        # Save the file to ./uploads
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(
            basepath, 'uploads', secure_filename(f.filename))
        f.save(file_path)
        # Make predictionss
        preds_1 = model_predict(file_path, model)
        resp = ["Deseased","Healthy"]
        b_1 = resp[np.argmax(preds_1)]
        # Process your result for human
        os.remove('uploads/' + f.filename)
        return b_1
    return None

#process predict 2
@app.route("/check", methods=['POST','GET'])
def check():

    if request.method == 'POST':
        # Get the file from post request
        e = request.files['file']
        # Save the file to ./uploads
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(
            basepath, 'uploads', secure_filename(e.filename))
        e.save(file_path)
        # Make predictionss
        preds = model_predict_2(file_path, model_2)
        res = ["Blast","Brown_Spot","Hispa"]
        b = res[np.argmax(preds)]
        # Process your result for human
        os.remove('uploads/' + e.filename)
        return b
    return None


if __name__ == '__main__':
    app.run(debug=True, threaded=False)