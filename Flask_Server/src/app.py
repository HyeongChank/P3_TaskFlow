from flask import Flask, request
from flask_cors import CORS
import word_anal
app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/api/todoWordAnal', methods=['POST'])
def todo_word_anal():
    wordData = request.get_json()
    print(wordData)
    top_words = word_anal.do_preprocessing(wordData)
    # print(wordData)
    return top_words

if __name__=='__main__':
    app.run()