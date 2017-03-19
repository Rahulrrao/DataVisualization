import json

data = []
data_review = []
data_reviews = []

for cat in open('/Users/rahulrao/Documents/DV/Projects/yelp_dataset_challenge_round9/yelp_academic_dataset_business.json', encoding='utf8'):

    cat_data = json.loads(cat)

    if cat_data['categories'] is not None:
        if "Restaurants" in cat_data['categories']:
            cat_data.pop('address', None)
            cat_data.pop('postal_code', None)
            cat_data.pop('is_open', None)
            cat_data.pop('attributes', None)
            cat_data.pop('categories', None)
            cat_data.pop('hours', None)
            cat_data.pop('type', None)
            data_review.append(cat_data['business_id'])
            data.append(cat_data)


with open('revised_file.json', 'w') as outfile:
    for line in data:
        json.dump(line, outfile)
        outfile.write('\n')

# for business in open('revised_file.json', encoding='utf8'):
#     business_data = json.loads(business)
#     data.append(business_data['business_id'])

for review in open('/Users/rahulrao/Documents/DV/Projects/yelp_dataset_challenge_round9/yelp_academic_dataset_review.json', encoding='utf8'):
    review_data = json.loads(review)
    if review_data['business_id'] in data_review:
        review_data.pop('user_id', None)
        data_reviews.append(review_data)


with open('revised_review.json', 'w') as outfile:
    for line in data_reviews:
        json.dump(line, outfile)
        outfile.write('\n')

