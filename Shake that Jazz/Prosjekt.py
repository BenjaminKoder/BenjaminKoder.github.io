import pygame as pg
from sys import exit
import math as m

pg.init()
clock = pg.time.Clock()
fps = 60
W = 1200
H = 600
screen = pg.display.set_mode((W,H))

pizzaNum = 1
frameCount = 0

pizzaSurf = pg.image.load(f"pizza/{pizzaNum}.png")
pizzaSurf = pg.transform.scale(pizzaSurf,(160,160))
pizzaMask = pg.mask.from_surface(pizzaSurf,255)
pizzaRect = pizzaMask.get_rect(center=(W/2,H/2))
# pizzaRect = pizzaSurf.get_rect(center=(W/2,H/2))

surf = pg.image.load(f"pizza/{pizzaNum}.png").convert_alpha()
surf = pg.transform.scale(surf,(320,320))
mask = pg.mask.from_surface(surf,255)
rect = mask.get_rect(center=(0,H/2))

while True:
    clock.tick(fps)
    for event in pg.event.get():
        if event.type == pg.QUIT:
            pg.quit()
            exit()
    
    screen.fill((0,0,150))
    frameCount+=1
    if frameCount%20==0:
        pizzaNum+=1
    if pizzaNum>=20:
        pizzaNum = 1
#     pizzaSurf = pg.image.load(f"pizza/{pizzaNum}.png").convert_alpha()
#     pizzaSurf = pg.transform.scale(pizzaSurf,(160,160))
#     pizzaRect = pizzaSurf.get_rect(center=(W/2,H/2))
    pizzaSurf = pg.image.load(f"pizza/{pizzaNum}.png")
    pizzaSurf = pg.transform.scale(pizzaSurf,(160,160))
    pizzaMask = pg.mask.from_surface(pizzaSurf,255)
    pizzaRect = pizzaMask.get_rect(center=(W/2,H/2))
    pizzaRect.y+=10*m.sin(frameCount/10)
    
    rect.x +=1
#     if rect.colliderect(pizzaRect):
#         print(frameCount)
#     print(pg.mask.Mask.overlap(pizzaMask))
    
    screen.blit(pizzaSurf,pizzaRect)
    screen.blit(surf, rect)
#     print(pizzaMask)
    
    
    pg.display.update()