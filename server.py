from flask import Flask
from flask import render_template
app = Flask(__name__)


@app.route('/')
@app.route('/home')
def hello_world():
    data = {"title":"Test",
        "username":"wibble",
        "content":"hello world!"}
    post2 = {"title":"Test",
        "username":"wibble",
        "content":"hello world!"}
        
    posts = [data, post2]    
    return render_template('home.html', posts = posts);
    
if __name__ == "__main__":
    app.run(debug=True);