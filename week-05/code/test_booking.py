import unittest
from booking import can_book


class BookingTests(unittest.TestCase):
    # 1. Base case: Touching endpoints (allowed) - AC4
    def test_touching_end_is_allowed(self):
        self.assertIs(can_book(660, 720, 540, False, [(600, 660)]), True)

    # 2. Base case: Partial overlap (rejected) - AC4
    def test_overlap_is_rejected(self):
        self.assertIs(can_book(630, 690, 540, False, [(600, 660)]), False)

    # 3. Base case: Room is blocked (rejected) - AC3
    def test_blocked_room_is_rejected(self):
        self.assertIs(can_book(660, 720, 540, True, [(600, 660)]), False)

    # 4. Base case: Exactly 120 minutes (allowed) - AC2
    def test_exactly_120_minutes_allowed(self):
        self.assertIs(can_book(720, 840, 540, False, [(600, 660)]), True)

    # 5. Base case: Over 120 minutes (rejected) - AC2
    def test_over_120_minutes_rejected(self):
        self.assertIs(can_book(720, 841, 540, False, [(600, 660)]), False)

    # 6. Base case: Starts now (rejected, must be start > now) - AC1
    def test_starts_now_is_rejected(self):
        self.assertIs(can_book(540, 570, 540, False, [(600, 660)]), False)

    # 7. Further kind: Negative start time (rejected, fixes M2) - AC1
    def test_negative_start_time_rejected(self):
        self.assertIs(can_book(-10, 60, -20, False, []), False)

    # 8. Further kind: Zero-length and reversed times - AC1
    def test_zero_length_and_reversed_times_rejected(self):
        self.assertIs(can_book(600, 600, 540, False, []), False)
        self.assertIs(can_book(700, 650, 540, False, []), False)

    # 9. Further kind: Day bounds (end at 1440) - AC1
    def test_day_bounds_allowed(self):
        self.assertIs(can_book(1320, 1440, 540, False, []), True)
        self.assertIs(can_book(1320, 1441, 540, False, []), False)

    # 10. Further kind: Overlap with the LAST booking in a long list (fixes M7) - AC4
    def test_overlap_with_last_booking_in_list_rejected(self):
        existing = [(100, 200), (300, 400), (600, 660)]
        self.assertIs(can_book(630, 690, 540, False, existing), False)

    # 11. Further kind: Unchanged input and exact Boolean return (fixes M9 & M10) - AC5
    def test_input_not_modified_and_strict_boolean(self):
        existing = [(600, 660)]
        existing_copy = [(600, 660)]
        res = can_book(660, 720, 540, False, existing)
        # Verify return type is exactly Boolean
        self.assertIs(type(res), bool)
        self.assertIs(res, True)
        # Verify input list is unchanged
        self.assertEqual(existing, existing_copy)

    # 12. Further kind: Other overlap relationships (inside & containing) - AC4
    def test_inside_and_containing_overlaps_rejected(self):
        self.assertIs(can_book(615, 645, 540, False, [(600, 660)]), False)
        self.assertIs(can_book(570, 690, 540, False, [(600, 660)]), False)


if __name__ == "__main__":
    unittest.main()
