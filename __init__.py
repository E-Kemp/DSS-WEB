
from flask import Flask, redirect, render_template, request, flash, make_response 
import json, sys
app = Flask(__name__)

RUNTIME = "LOCAL"
WEB_ADDRESS = "127.0.0.1:5432"
WEB_PORT = "5432"
API_ADDRESS = "127.0.0.1:5000"
API_PORT = "5000"

sys.path.append("lib/")
from response_headers import Headers

if RUNTIME == "LOCAL": 
    data = open('config/HEADERS_local.conf', 'r')
    
elif RUNTIME == "PRODUCTION":
    data = open('config/HEADERS_production.conf', 'r')

header_struct = json.load(data)
data.close()

app = Flask(__name__)
app.after_request(Headers.addResponseHeaders)


#These are really important headers for CSRF, XSS 
#plus a few other things
#do not touch!
def addheaders(response):
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains' #see https://www.thesslstore.com/blog/what-is-hypertext-strict-transport-security-hsts/
    response.headers['X-XSS-Protection'] = '1; mode=block'
    return response
app.after_request(addheaders)


@app.route('/')
@app.route('/home')
def home():
    return render_template('home.html', sesh = request.cookies.get('S_ID'))
    

@app.route('/search/<term>')
def search(term):
    return render_template('search.html', term = term, sesh = request.cookies.get('S_ID'))


@app.route('/login')
def login():
    return render_template('login.html', sesh = request.cookies.get('S_ID'))


@app.route('/register')
def register():
    return render_template('register.html', sesh = request.cookies.get('S_ID'))


@app.route('/newpost')
def newpost():
    return render_template('newpost.html', sesh = request.cookies.get('S_ID'))


@app.route('/posts/<uuid>')
def profile(uuid):
    return render_template('post.html', uuid = uuid, sesh = request.cookies.get('S_ID'))


@app.route('/settings')
def settings():
    return render_template('settings.html', sesh = request.cookies.get('S_ID'))




if __name__ == "__main__":
    app.run(debug=True, port=WEB_PORT)
