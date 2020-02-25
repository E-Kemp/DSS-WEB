from flask import Flask, redirect, render_template, request, flash, make_response
app = Flask(__name__)

user = "test"


@app.route('/')
@app.route('/home')
def home():
    data = {
        "title":"Test",
        "username":"wibble",
        "content":"hello world!"}
    post2 = {
        "title":"Test",
        "username":"wibble",
        "content":"hello world!"}
    posts = [data, post2]    
    return render_template('home.html', user = request.cookies.get('userID'), posts = posts)
    

@app.route('/search', methods=['GET', 'POST'])
def search():
    if request.method == 'POST':
        search = request.form['search']
        return render_template('search.html', user = request.cookies.get('userID'), search = search)
    return redirect('/home')



@app.route('/login', methods=['GET'])
def login():
    error = None
    return render_template('login.html', user = request.cookies.get('userID'), error = error)


@app.route('/register', methods=['GET', 'POST'])
def register():
    error = None
    if request.method == 'POST':
        username = request.form['usernameInput']
        email = request.form['emailInput']
        password = request.form['passwordInput'] #pass directly into API later?
        verify = request.form['verifyPasswordInput']
        if(password != verify):
            error = 'The passwords didn\'t match!'
        else:
            error = 'There\'s no database API yet! Try again later'
    return render_template('register.html', user = request.cookies.get('userID'), error = error)


@app.route('/newpost', methods=['GET', 'POST'])
def newpost():
    #error = None
    if request.method == 'POST':
        title = request.form['titleInput']
        post = request.form['postInput']
    return render_template('newpost.html', user = request.cookies.get('userID'))#, error = error)


@app.route('/settings', methods=['GET', 'POST'])
def settings():
    if request.method == 'POST':
        oldPass = request.form['oldPasswordInput']
        newPass = request.form['newPasswordInput']
        verPass = request.form['verifyPasswordInput']
    return render_template('settings.html', user = request.cookies.get('userID'))



#TESTING GROUND
# --------------------------------------------------------------------------------- #

@app.route('/setuser', methods=['GET', 'POST'])
def setuser():
    response = make_response(render_template('home.html'))
    response.set_cookie('userID', 'test')
    return response

@app.route('/setnone', methods=['GET', 'POST'])
def setnone():
    response = make_response(render_template('home.html'))
    response.set_cookie('userID', expires=0)
    return response

# --------------------------------------------------------------------------------- #



if __name__ == "__main__":
    app.run(debug=True)