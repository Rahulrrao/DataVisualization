from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk import tokenize
from nltk.classify import NaiveBayesClassifier
from nltk.corpus import subjectivity
from nltk.sentiment import SentimentAnalyzer
from nltk.sentiment.util import *
import numpy as np
import twython


from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

pos_rate = []
neu_rate = []
neg_rate = []

dict = {}

analyzer = SentimentIntensityAnalyzer()
new_file = open('reviews_sentiment.json', 'w')

for review in open('/Users/rahulrao/Documents/DV/Projects/DataVisualization/Dataset/revised_review.json', encoding='utf8'):
    review_data = json.loads(review)
    review_data.pop('type', None)
    sentence = review_data['text']
    lines_list = tokenize.sent_tokenize(sentence)
    for sent in lines_list:
        vs = analyzer.polarity_scores(sent)
        vs.pop('compound', None)
        pos_rate.append(vs['pos'])
        neu_rate.append(vs['neu'])
        neg_rate.append(vs['neg'])

    dict['pos'] = np.mean(pos_rate)
    dict['neg'] = np.mean(neg_rate)
    dict['neu'] = np.mean(neu_rate)


    if dict['neu'] == 1:
        review_data['sentiment'] = 'neu'
        print('neu')
        json.dump(review_data, new_file)
        new_file.write('\n')
    else:
        dict.pop('neu', None)
        sentiment = max(dict, key=lambda i: dict[i])
        print(str(sentiment))
        review_data['sentiment'] = str(sentiment)
        json.dump(review_data, new_file)
        new_file.write('\n')

    pos_rate.clear()
    neg_rate.clear()
    neu_rate.clear()






