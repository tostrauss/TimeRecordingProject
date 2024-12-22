import math
from statistics import stdev

# List of numbers for which to calculate the standard deviation
data = [1, 2, 3, 4, 5, 100, 188925]

# Check if the list has enough elements to calculate standard deviation
if len(data) > 1:
    result = stdev(data)
    print(f"The standard deviation of the data is: {result}")
else:
    print("Standard deviation cannot be calculated for a list with less than two elements.")
