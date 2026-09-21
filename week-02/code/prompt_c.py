def analyze_marks(marks, pass_mark=50):
    if not marks:
        raise ValueError("marks must not be empty")

    for mark in marks:
        if isinstance(mark, bool) or not isinstance(mark, (int, float)):
            raise ValueError("all marks must be numeric")
        if mark < 0 or mark > 100:
            raise ValueError("marks must be between 0 and 100")

    average = sum(marks) / len(marks)
    highest = max(marks)
    lowest = min(marks)

    passed = sum(mark >= pass_mark for mark in marks)
    pass_rate = round((passed / len(marks)) * 100, 2)

    return {
        "average": average,
        "highest": highest,
        "lowest": lowest,
        "pass_rate": pass_rate,
    }


# Tests

# 1. One mark
assert analyze_marks([75]) == {
    "average": 75,
    "highest": 75,
    "lowest": 75,
    "pass_rate": 100.0,
}

# 2. Decimals
result = analyze_marks([45.5, 60.5, 80.0])
assert result["average"] == 62.0
assert result["highest"] == 80.0
assert result["lowest"] == 45.5
assert result["pass_rate"] == 66.67

# 3. Custom pass_mark
result = analyze_marks([40, 60, 80], pass_mark=70)
assert result["pass_rate"] == 33.33

# 4. Empty list
try:
    analyze_marks([])
    assert False, "Expected ValueError"
except ValueError:
    pass

# 5. Text value
try:
    analyze_marks([40, "60", 80])
    assert False, "Expected ValueError"
except ValueError:
    pass

# 6. Mark below 0
try:
    analyze_marks([-1, 50, 80])
    assert False, "Expected ValueError"
except ValueError:
    pass

# 7. Mark above 100
try:
    analyze_marks([50, 80, 101])
    assert False, "Expected ValueError"
except ValueError:
    pass


# Example
print(analyze_marks([40, 60, 80], 50))
# {
#     'average': 60.0,
#     'highest': 80,
#     'lowest': 40,
#     'pass_rate': 66.67
# }