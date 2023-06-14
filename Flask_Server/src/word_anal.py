import pandas as pd
from collections import Counter
def do_preprocessing(wordData):
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
    
if __name__=='__main__':
    # wordData = {'wordanal': ['123', '123232', '학점은행제', 'test1', 'test2', 'test3', 'todolist 달성 중복 제거', 'firebase build 하기', '토스', 'ncs 책, 동향 찾아보기', 'testtt', 'testtt22', 'testtt2233', '123', '1234', '1234', '123', '12323223']}
    wordData = {'wordanal': [['123', '123232', '학점은행제', 'test1', 'test2', 'test3', 'todolist 달성 중복 제거', 'firebase build 하기', '토스', 'ncs 책, 동향 찾아보기', 'testtt', 'testtt22', 'testtt2233', '123', '1234', '1234', '123', '12323223'], ['123', '123', '123', 'test1', 'test2', 'test3', '코드 수정', 'build', 
'토스', '찾기', 'tt', 'tt', 'tt', '123', '1234', '1234', '123', '123']]}
    do_preprocessing(wordData)