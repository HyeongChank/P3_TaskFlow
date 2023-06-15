from flask import Flask, request
from flask_cors import CORS
import word_count_anal
import sentiment_anal
app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/api/todoWordAnal', methods=['POST'])
def todo_word_anal():
    wordData = request.get_json()
    print(wordData)
    top_words = word_count_anal.do_counting(wordData)
    # print(wordData)
    return top_words

@app.route('/api/sentimentAnal', methods = ['POST'])
def sentiment_word_anal():
    wordData = request.get_json()
   
    sentiment_results = sentiment_anal.do_sensingAnal(wordData)
    senti_words = dict(sentiment_results)
    return senti_words


if __name__=='__main__':
    app.run()