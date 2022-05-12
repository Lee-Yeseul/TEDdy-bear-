import numpy as np
import pandas as pd
import random
from datetime import datetime, timedelta


sex = ['여자', '남자']
age_list = [10, 20, 30, 40, 50, 60]
occupation = ['개발자', '디자이너', '자연과학연구원', '공학연구원','마케터', 'md', '예술계 종사자', '회계사', '관세사', '노무사', '변호사', '공무원']
myTopics = ["technology","science","culture","globalissues","society","design","socialchange","business","animation","health",]


def date_generator() : 
    email_list = []
    start = datetime.now()
    end = start - timedelta(days=30)    
    for i in range(1, 101):
        random_date = start + (end - start) * random.random()
        email_list.append(random_date)
    return email_list

def random_generator(data):
    random_list = [] 
    for i in range(1, 101):
        random_list.append(random.choice(data))
    return random_list

def random_topics_generator(data):
    random_list = [] 
    for i in range(1,101):
        random_list.append(random.choices(data, k =3))
    return random_list

def email_generator(string) : 
    email_list = []
    for i in range(1, 101):
        email = 'test' + str(i) + string
        email_list.append(email)
    return email_list



random_sex = random_generator(sex)
random_age = random_generator(age_list)
random_occupation = random_generator(occupation)
random_topics = random_topics_generator(myTopics)
emails = email_generator('@test.com')
days = date_generator()

td = {
    'sex' : random_sex,
    'age' : random_age,
    'occupation' : random_occupation,
    'password' : 1234,
    'bearName' : 'test_bear',
    'myTopics' : random_topics,
    'name' : 'test',
    'email' : emails,
    'createdAt' : days
}
df1 = pd.DataFrame(td)
# userData = pd1.to_json(force_ascii=False, orient= 'records')
# pd1.to_json('user.json', force_ascii=False, orient= 'records' )
# print(userData)
df1

new_data = pd.read_csv('new_data.csv')
new = new_data
new 
talks = np.array(new['talk_id'].tolist())
talks
# 시청기록 
# user_id(email), talkId, createdAt 
def random_talks_generator(data):
    random_list = [] 
    for i in range(1,101):
        random_list.append(random.choices(data, k =30))
    return random_list

talkId = random_talks_generator(talks)

td = {
    'sex' : random_sex,
    'age' : random_age,
    'occupation' : random_occupation,
    'password' : 1234,
    'bearName' : 'test_bear',
    'myTopics' : random_topics,
    'name' : 'test',
    'email' : emails,
    'createdAt' : days,
    'talkId' : talkId
}
df2 = pd.DataFrame(td)
# df2.to_json('user_viewhistory.json', force_ascii=False, orient= 'records' )
df2