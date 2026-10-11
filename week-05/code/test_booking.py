import unittest
from booking import can_book


class BookingTests(unittest.TestCase):
    
    def test_touching_end_is_allowed(self):
        self.assertIs(can_book(660, 720, 540, False, [(600, 660)]), True)

    
    def test_overlap_is_rejected(self):
        self.assertIs(can_book(630, 690, 540, False, [(600, 660)]), False)

   
    def test_blocked_room_is_rejected(self):
        self.assertIs(can_book(660, 720, 540, True, [(600, 660)]), False)

 
    def test_exactly_120_minutes_allowed(self):
        self.assertIs(can_book(720, 840, 540, False, [(600, 660)]), True)

    def test_over_120_minutes_rejected(self):
        self.assertIs(can_book(720, 841, 540, False, [(600, 660)]), False)

    def test_starts_now_is_rejected(self):
        self.assertIs(can_book(540, 570, 540, False, [(600, 660)]), False)

    def test_negative_start_time_rejected(self):
        self.assertIs(can_book(-10, 60, -20, False, []), False)

    def test_zero_length_and_reversed_times_rejected(self):
        self.assertIs(can_book(600, 600, 540, False, []), False)
        self.assertIs(can_book(700, 650, 540, False, []), False)

    def test_day_bounds_allowed(self):
        self.assertIs(can_book(1320, 1440, 540, False, []), True)
        self.assertIs(can_book(1320, 1441, 540, False, []), False)

    def test_overlap_with_last_booking_in_list_rejected(self):
        existing = [(100, 200), (300, 400), (600, 660)]
        self.assertIs(can_book(630, 690, 540, False, existing), False)

    def test_input_not_modified_and_strict_boolean(self):
        existing = [(600, 660)]
        existing_copy = [(600, 660)]
        res = can_book(660, 720, 540, False, existing)

        self.assertIs(type(res), bool)
        self.assertIs(res, True)
     
        self.assertEqual(existing, existing_copy)

    def test_inside_and_containing_overlaps_rejected(self):
        self.assertIs(can_book(615, 645, 540, False, [(600, 660)]), False)
        self.assertIs(can_book(570, 690, 540, False, [(600, 660)]), False)


if __name__ == "__main__":
    unittest.main()
