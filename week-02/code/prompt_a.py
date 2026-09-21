students = {
    "Alice": 85,
    "Bob": 72,
    "Charlie": 91,
    "David": 58,
    "Emma": 43
}

marks = list(students.values())

average = sum(marks) / len(marks)
highest = max(marks)
lowest = min(marks)

passed = [name for name, mark in students.items() if mark >= 50]
failed = [name for name, mark in students.items() if mark < 50]

print("Student Marks Analysis")
print("----------------------")

for name, mark in students.items():
    print(f"{name}: {mark}")

print(f"\nAverage mark: {average:.2f}")
print(f"Highest mark: {highest}")
print(f"Lowest mark: {lowest}")

print(f"\nPassed students: {len(passed)}")
print(f"Failed students: {len(failed)}")

print("\nPassed:", ", ".join(passed))
print("Failed:", ", ".join(failed))