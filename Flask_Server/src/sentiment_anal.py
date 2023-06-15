import nltk
nltk.download('vader_lexicon')

from nltk.sentiment import SentimentIntensityAnalyzer
from translate import Translator
from collections import defaultdict
## google API 바뀌어서 안정적이지 않음
# from googletrans import Translator


## 감성분석
def do_sensingAnal(wordData):
   
    print(wordData)
    wordcdate = wordData['sentianal']['todocdate']
    print(wordcdate)
    wordcombined = wordData['sentianal']['todocombined']
    print(wordcombined)
    combined_dict = defaultdict(str)
    for date, text in zip(wordcdate, wordcombined):
        combined_dict[date] += text + ' '
    print(combined_dict)
 
    # 한글 -> 영어 Translator 객체 생성
    translator = Translator(from_lang='ko', to_lang='en')  # 수정된 Translator 객체 생성
    ## NLTK 의 Vader 사용
    sia = SentimentIntensityAnalyzer()
    # 감성 점수 계산
    # 점수 출력
    sentiment_results = defaultdict(float)
    for key, sentence in combined_dict.items():
        translated = translator.translate(sentence)  # 수정된 translate 메소드 호출
        sentiment_scores = sia.polarity_scores(translated)  # 수정: 번역된 문장에 대한 감성 점수 계산
        sentiment_results[key] = sentiment_scores['compound']
    # sentiment_results 는 defaultdict 이라고 표준 딕셔너리로 변환해야 함. app.py에서 함
    print(sentiment_results)
    return sentiment_results
    
    
if __name__=='__main__':
    wordData = {'sentianal': {'todocdate': ['2023-05-04', '2023-05-04', '2023-05-05', '2023-05-05', '2023-05-07', '2023-05-07', '2023-05-07', '2023-05-07', '2023-05-07', '2023-05-08', '2023-06-14'], 'todocombined': ['서버 구축 34', '나쁨 test', '놀기2 Good', 'test test', 'test test', 'test23232 test', 'tete tete', 'tete33 tete', 'tete3334 tete', 'test23232 test', 'firebase 작동방법 npm run build를 먼저 꼭하고 firebase deploy 할 것!!!!!!!!!']}}
    do_sensingAnal(wordData)