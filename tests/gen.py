c = 31405
i = 0

while c <= 31985:
    if i % 2 == 0:
        t = 'shape_248'
    else:
        t = 'shape_256'
    print(f'.set({{data:{{x:{c/100},y:225}},scale:{{x:ds2,y:ds2}}}}, {t})')
    c += 20
    i += 1