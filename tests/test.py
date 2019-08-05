from PIL import Image, ImageChops


img = Image.open('tests/spritesheet/image 2.png')
img.crop(img.getbbox()).save('out.png')
# bg = Image.new(img.mode, img.size, img.getpixel((0, 0)))
# # print(img.getpixel((0, 0)))
# diff = ImageChops.difference(img, bg)
# diff = ImageChops.add(diff, diff, 2.0, -100)
# bbox = diff.getbbox()
# if bbox:
#     img.crop(bbox).save('out.png')

# print(diff)
