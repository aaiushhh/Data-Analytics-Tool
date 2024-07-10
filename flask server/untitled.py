import pandas as pd
data=pd.read_csv("prac.csv")
print(type(data))
print(data.groupby(by='BRANCH').sum())
print(type(data.groupby(by='BRANCH').sum()))