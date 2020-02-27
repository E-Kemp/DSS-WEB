from flask import Flask, redirect, render_template, request, flash
app = Flask(__name__)



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
    user = None
    data = {
        "title":"Test",
        "username":"wibble",
        "content":"hello world!"}
    post2 = {
        "title":"Test",
        "username":"wibble",
        "content":"hello world!"}
    posts = [data, post2]    
    return render_template('home.html', user = user, posts = posts)
    

@app.route('/search', methods=['GET', 'POST'])
def search():
    user = None
    if request.method == 'POST':
        search = request.form['search']
        return render_template('search.html', user = user, search = search)
    return redirect('/home')



@app.route('/login', methods=['GET', 'POST'])
def login():
    user = None
    error = None
    if request.method == 'POST':
        error = 'There\'s no database API yet! Try again later'
    return render_template('login.html', user = user, error = error)


@app.route('/register', methods=['GET', 'POST'])
def register():
    user = None
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
    return render_template('register.html', user = user, error = error)


@app.route('/post', methods=['GET', 'POST'])
def post():
    user = None
    #error = None
    if request.method == 'POST':
        title = request.form['titleInput']
        post = request.form['postInput']
    return render_template('post.html', user = user)#, error = error)


@app.route('/settings', methods=['GET', 'POST'])
def settings():
    user = None
    if request.method == 'POST':
        oldPass = request.form['oldPasswordInput']
        newPass = request.form['newPasswordInput']
        verPass = request.form['verifyPasswordInput']
    return render_template('settings.html', user = user)


if __name__ == "__main__":
    app.run(debug=True)