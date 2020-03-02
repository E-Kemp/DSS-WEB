from flask import Flask, redirect, render_template, request, flash, make_response
app = Flask(__name__)


@app.route('/')
@app.route('/home')
def home():
    return render_template('home.html', user = request.cookies.get('userID'))
    

@app.route('/search')
def search():
    return render_template('search.html', user = request.cookies.get('userID'))


@app.route('/login')
def login():
    return render_template('login.html', user = request.cookies.get('userID'))


@app.route('/register')
def register():
    return render_template('register.html', user = request.cookies.get('userID'))


@app.route('/newpost')
def newpost():
    return render_template('newpost.html', user = request.cookies.get('userID'))


@app.route('/settings')
def settings():
    return render_template('settings.html', user = request.cookies.get('userID'))


# ----------------------------- TESTING GROUND ------------------------------------ #
# --------------------------------------------------------------------------------- #

@app.route('/setuser')
def setuser():
    response = make_response(render_template('home.html'))
    response.set_cookie('userID', 'test')
    return response

@app.route('/setnone')
def setnone():
    response = make_response(render_template('home.html'))
    response.set_cookie('userID', expires=0)
    return response

# --------------------------------------------------------------------------------- #



if __name__ == "__main__":
    app.run(debug=True)