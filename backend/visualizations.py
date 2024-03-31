import matplotlib.pyplot as plt
from matplotlib.pyplot import figure
import pandas as pd
import numpy as np

# Function to map the colors as a list from the input list of x variables
def pltcolor(lst):
    cols=[]
    for l in lst:
        if l > 15:
            cols.append('crimson')
        elif l > 5:
            cols.append('mediumvioletred')
        elif l < -15:
            cols.append('deepskyblue')
        elif l < -5:
            cols.append('cornflowerblue')
        else:
            cols.append('slateblue')
    return cols

df = pd.read_csv('source_reliability_bias.csv')

labels = df['Source'].values
reliability = df['Reliability'].values
bias = df['Bias'].values
cols = pltcolor(bias)
pt_indexes = list(range(100, 101))

fig = figure(figsize=(10, 5), dpi=100)
# sqr = np.square(bias)
# ax = fig.add_subplot(1, 1, 1)
# ax.spines['left'].set_position('center')
# ax.spines['bottom'].set_position('center')
# ax.spines['right'].set_color('none')
# ax.spines['top'].set_color('none')

plt.xlabel('Bias')
plt.ylabel('Reliability')
plt.scatter(bias, reliability, s=5, c=cols)

for index in pt_indexes:
    plt.scatter(bias[index], reliability[index], s=35, color="lime")
    plt.annotate(labels[index], (bias[index], reliability[index]), fontsize=10, weight='bold')

# Add all source labels
# for i, txt in enumerate(labels):
#     plt.annotate(txt, (bias[i], reliability[i]), fontsize=5)

plt.show()