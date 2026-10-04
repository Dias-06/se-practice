@startuml
left to right direction

actor Student
actor Administrator

rectangle "Smart Campus Study Room Booking System" {

  usecase "Book a free study room\n(US-01)" as UC01
  usecase "View room availability\n(US-02)" as UC02
  usecase "Cancel own booking\n(US-03)" as UC03

  usecase "Block a room\n(US-04)" as UC04
  usecase "Unblock a room\n(US-05)" as UC05
  usecase "Review room usage\n(US-06)" as UC06

  usecase "Check booking constraints" as CheckRules
  usecase "Produce booking confirmation" as Confirmation
}

Student --> UC01
Student --> UC02
Student --> UC03

Administrator --> UC04
Administrator --> UC05
Administrator --> UC06

UC01 ..> CheckRules : <<include>>
UC01 ..> Confirmation : <<include>>

@enduml