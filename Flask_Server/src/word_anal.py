import pandas as pd
from collections import Counter
from nltk.sentiment import SentimentIntensityAnalyzer
from googletrans import Translator

## 단어빈도 계산
def do_counting(wordData):
    words = Counter()
    wordtitle = wordData['wordanal'][0]
    wordcontent = wordData['wordanal'][1]
    word_total = wordtitle + wordcontent
    print(word_total)
    words.update(word_total)
    print(words)
    # word_count_df = pd.DataFrame.from_dict(words, orient='index', columns=['count'])
    # word_count_df.index.name = 'word'
    # word_count_df.reset_index(inplace=True)
    top_words = words.most_common(10)
    print('top_words',top_words)
    return top_words

## 감성분석
def do_sensingAnal(wordData):
    wordtitle = wordData['wordanal'][0]
    wordcontent = wordData['wordanal'][1]
    word_total = wordtitle + wordcontent
    word_text = ''.join(word_total)
    print('word_text', word_text)

    # 한글 -> 영어 Translator 객체 생성
    translator = Translator()
    ## NLTK 의 Vader 사용
    sia = SentimentIntensityAnalyzer()
    # 감성 점수 계산
    # 점수 출력
    for sentence in word_total:
        translated = translator.translate(sentence, src='ko', dest='en')
        print(translated)
        print(translated.text)
        sentiment_scores = sia.polarity_scores(sentence)
        for key, score in sentiment_scores.items():
            print(f'{key}: {score}, ', end='')
            print()
        print('\n')
    
    
if __name__=='__main__':
    wordData = {'wordanal': [['밥먹기 좋아하고 운동하기 좋아하고 기분이 Good', 'bad', '학점은행제', 'good'], 
                ['토스', '찾기', '왜', 'good','좋음']]}
    do_counting(wordData)
    do_sensingAnal(wordData)