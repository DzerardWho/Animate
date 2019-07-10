from numpy import sin, cos, radians, pi, degrees
from angles import normalize

while True:
    angle = normalize(int(input("Wprowadź kąt: ")), 0, 90)
    # print(angle)
    width = int(input("Wprowadź szerokość: "))
    height = int(input("Wprowadź wysokość: "))
    # angle = radians(angle)
    angle = radians(angle)
    # angle = radians(angle if angle <= 90 else angle - 90)
    print("Szerokość: ", width * sin(angle) + height * cos(angle))
    print("Wysokość: ", width * cos(angle) + height * sin(angle))


    # print(angle, radians(angle))
    # print(angle, degrees(angle))
