from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

# PWA needs sw.js and manifest.json served from ROOT URL (not /static/)
@app.route('/sw.js')
def sw():
    return send_from_directory('static', 'sw.js',
                               mimetype='application/javascript')

@app.route('/manifest.json')
def manifest():
    return send_from_directory('static', 'manifest.json',
                               mimetype='application/json')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)