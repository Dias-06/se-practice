def analyze_marks(marks, pass_mark=50):
    if not marks:
        raise ValueError("marks must not be empty")

    for mark in marks:
        if isinstance(mark, bool) or not isinstance(mark, (int, float)):
            raise ValueError("marks must contain only int or float values")
        if mark < 0 or mark > 100:
            raise ValueError("marks must be between 0 and 100")

    average = sum(marks) / len(marks)
    pass_rate = round(
        sum(mark >= pass_mark for mark in marks) / len(marks) * 100,
        2
    )

    return {
        "average": average,
        "highest": max(marks),
        "lowest": min(marks),
        "pass_rate": pass_rate,
    }