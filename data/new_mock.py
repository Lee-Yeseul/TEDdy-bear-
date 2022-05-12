import numpy as np
import pandas as pd
import random
from datetime import datetime, timedelta
import seaborn as sns
import matplotlib.pyplot as plt

# 가중치 적용 random_topics 
# 여성, 남성
# 10대, 20대, 30대, 40대, 50대 (5)
# 직업 : 개발자, 디자이너, 마케터, 교사, 공무원, 예술계 종사자, 운동선수, 사회복지사 (8)
# myTopics = ["technology","science","culture","globalissues","society","design","socialchange","business","animation","health"]


sex = ['여자', '남자']
age_list = list(range(10, 60, 10))
occupation_list = [ '개발자', '디자이너', '마케터', '교사', '공무원', '예술계 종사자', '운동선수', '사회복지사']

def email_generator(string) : 
    email_list = []
    for i in range(0, 1000):
        email = 'test' + str(i) + string
        email_list.append(email)
    return email_list

def date_generator() : 
    date_list = []
    start = datetime.now()
    end = start - timedelta(days=30)    
    for i in range(0, 1000):
        random_date = start + (end - start) * random.random()
        date_list.append(random_date)
    return date_list

emails = email_generator('@test.com')
days = date_generator()

td = {
    'sex' : sex * 500,
    'age' : age_list * 200 ,
    'occupation' : occupation_list * 125,
    'password' : 1234,
    'bearName' : 'test_bear',
    'name' : 'test',
    'email' : emails,
    'createdAt' : days
}
df1 = pd.DataFrame(td)


df1.loc[df1['age'] == 10, 'occupation'] = '학생'

df1

# 여자 10대 
woman10 = pd.DataFrame((df1.loc[(df1['sex'] == '여자') & (df1['age'] <= 10) ] ))
# 여자 2030대
woman30 = pd.DataFrame((df1.loc[(df1['sex'] == '여자') & ((df1['age'] == 20) | (df1['age'] == 30))]))
# 여자 4050대
woman50 = pd.DataFrame((df1.loc[(df1['sex'] == '여자') & ((df1['age'] == 40) | (df1['age'] == 50))]))


# 남자 10대 
man10 = pd.DataFrame((df1.loc[(df1['sex'] == '남자') & (df1['age'] <= 10) ] ))
# 남자 2030대 
man30 = pd.DataFrame((df1.loc[(df1['sex'] == '남자') & ((df1['age'] == 20) | (df1['age'] == 30))]))
# 남자 4050대 
man50 = pd.DataFrame((df1.loc[(df1['sex'] == '남자') & ((df1['age'] == 40) | (df1['age'] == 50))]))

# 여자 10대 학생 
topicList = ["technology","science","culture","globalissues","society","design","socialchange","business","animation","health"]

def random_generator_for_woman10(data):
    random_list = [] 
    for i in range(100):
        random_list.append(random.choices(data, weights=(20, 10, 50, 10, 30, 20, 25, 5, 15, 5), k = 3))
    return random_list

woman10['myTopics'] = random_generator_for_woman10(topicList)
woman10

# # 남자 10대 학생 
# topicList = ["technology","science","culture","globalissues","society","design","socialchange","business","animation","health"]

def random_generator_for_man10(data):
    random_list = [] 
    for i in range(100):
        random_list.append(random.choices(data, weights=(30, 20, 50, 10, 15, 20, 30, 10, 25, 10), k = 3))
    return random_list

man10['myTopics'] = random_generator_for_man10(topicList)
man10

# # 여자 2030대 
# topicList = ["technology","science","culture","globalissues","society","design","socialchange","business","animation","health"]

def random_generator_for_woman30(data):
    random_list = [] 
    for i in range(200):
        random_list.append(random.choices(data, weights=(20, 5, 50, 40, 25, 45, 30, 40, 5, 20), k = 3))
    return random_list

woman30['myTopics'] = random_generator_for_woman30(topicList)
woman30

# 남자 2030대 
topicList = ["technology","science","culture","globalissues","society","design","socialchange","business","animation","health"]

def random_generator_for_man30(data):
    random_list = [] 
    for i in range(200):
        random_list.append(random.choices(data, weights=(40, 10, 20, 30, 35, 15, 30, 30, 15, 50), k = 3))
    return random_list

man30['myTopics'] = random_generator_for_man30(topicList)
man30

# 여자 4050대 
topicList = ["technology","science","culture","globalissues","society","design","socialchange","business","animation","health"]

def random_generator_for_woman50(data):
    random_list = [] 
    for i in range(200):
        random_list.append(random.choices(data, weights=(20, 10, 20, 30, 45, 25, 40, 50, 5, 60), k = 3))
    return random_list

woman50['myTopics'] = random_generator_for_woman50(topicList)
woman50

# 남자 4050대 
topicList = ["technology","science","culture","globalissues","society","design","socialchange","business","animation","health"]

def random_generator_for_man50(data):
    random_list = [] 
    for i in range(200):
        random_list.append(random.choices(data, weights=(20, 10, 20, 30, 45, 10, 30, 50, 5, 60), k = 3))
    return random_list

man50['myTopics'] = random_generator_for_man50(topicList)
man50

woman = [woman10, woman30, woman50]

df_woman = pd.concat(woman)
df_woman.reset_index(drop=True)

man = [man10, man30, man50]

df_man = pd.concat(man)
df_man.reset_index(drop=True)

total = [woman10, woman30, woman50, man10, man30, man50]

df_total = pd.concat(total)
df_total.reset_index(drop=True)

ten = [woman10, man10]
twothree = [woman30, man30]
fourfive  = [woman50, man50]

ten_df = pd.concat(ten)
ten_df.reset_index(drop=True)
twothree_df = pd.concat(ten)
twothree_df.reset_index(drop=True)
fourfive_df = pd.concat(ten)
fourfive_df.reset_index(drop=True)

woman10, woman30, woman50
man10, man30, man50

df_woman, df_man
df_total

ten_df, twothree_df, fourfive_df

from collections import Counter

woman10
def make_topic_list(data): 
    all_topics = []

    # 토픽 리스트로 변환
    for i in range(len(data)):
        topics = data.iloc[i]['myTopics']
        all_topics += topics
    # 주제와 상관없는 데이터 제거 
    remove_topics = {'TEDx', 'TED-Ed', 'TED Fellows'}
    all_topics = [i for i in all_topics if i not in remove_topics]
    return all_topics


def make_freq_10(data) : 
    counts = Counter(data)
    counts = counts.most_common()
    counts = pd.DataFrame(counts)
    counts.columns = ['topics', 'frequency']
    return counts

all_topics = make_topic_list(woman10)
result1 = make_freq_10(all_topics)
result1
sns.set_palette("Set2")
result1.plot.bar(x='topics', y='frequency')
plt.title("10, womans")

sns.set_palette("Set2")
woman10_topics = make_topic_list(woman10)
woman10_result = make_freq_10(woman10_topics)
woman10_result
woman10_result.plot.bar(x='topics', y='frequency')
plt.title("10, womans")

woman30_topics = make_topic_list(woman30)
woman30_result = make_freq_10(woman30_topics)
woman30_result
woman30_result.plot.bar(x='topics', y='frequency')
plt.title("2030, womans")

woman50_topics = make_topic_list(woman50)
woman50_result = make_freq_10(woman30_topics)
woman50_result
woman50_result.plot.bar(x='topics', y='frequency')
plt.title("4050, womans")


man10_topics = make_topic_list(man10)
man10_result = make_freq_10(man10_topics)
man10_result
man10_result.plot.bar(x='topics', y='frequency')
plt.title("10, mans")

man30_topics = make_topic_list(man30)
man30_result = make_freq_10(man30_topics)
man30_result
man30_result.plot.bar(x='topics', y='frequency')
plt.title("2030, mans")

man50_topics = make_topic_list(man30)
man50_result = make_freq_10(man30_topics)
man50_result
man50_result.plot.bar(x='topics', y='frequency')
plt.title("4050, mans")