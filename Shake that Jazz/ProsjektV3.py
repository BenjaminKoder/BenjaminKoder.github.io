import pygame as pg
import random as ran
from sys import exit
import spritesheetClass as ss
import math as m
pg.init()
fps = 60
W = 1200
H = 600
screen = pg.display.set_mode((W,H))
pg.display.set_caption("Shake that Jazz")

def eventListener():
    for event in pg.event.get():
        if event.type == pg.QUIT:
            pg.quit()
            exit()
def display():
    pg.time.Clock().tick(fps)    
    pg.display.update()

BLACK = (0,0,0)

def animation(imgFile,animationSteps,size,startingFrame):
    global lastUpdate, animationCooldown,animationList,frame,animationRect
    
    animationSS = pg.image.load(imgFile).convert_alpha()
    animationSS = ss.SpriteSheet(animationSS)

    animationList = []
    lastUpdate = pg.time.get_ticks()
    animationCooldown = 500
    frame = 0
    for i in range(animationSteps):
        animationSurf = animationSS.getImage(i+startingFrame,32,32,size,BLACK)
        animationList.append(animationSurf)
    animationRect = animationSurf.get_rect(center=(W/2,H/2))

animation("spritesheets/jazzplayer.png",2,200,0)

pizzaSurf = pg.image.load("jazzplayer/1.png")
pizzaSurf = pg.transform.scale(pizzaSurf,(200,200))


# pizza2 = pizzaSS.getImage(7,32,32,500,BLACK)
# pizza2Rect = pizza2.get_rect(topleft=(1000,0))


while True:
    eventListener()

    screen.fill((92,143,232))
    mx, my = pg.mouse.get_pos()
    
    pizzaRect = pizzaSurf.get_rect(center=(mx,my))
    screen.blit(pizzaSurf,pizzaRect)
    
#     k += 1
#     if k%20 == 0:
#         frame +=1
#     if frame>=animationSteps:
#         frame = 0
#     pizza = pizzaSS.getImage(pizzaNum,32,32,500,BLACK)
#     pizzaRect = pizza.get_rect(center=(W/2,H/2))
    
    
#     pizza2Rect.x-=1
    
#     screen.blit(pizza2,pizza2Rect)
    currentTime = pg.time.get_ticks()
    if currentTime - lastUpdate >= animationCooldown:
        frame+=1
        if frame >=len(animationList):
            frame = 0
        lastUpdate = currentTime

#     animationRect.y+=2*m.sin(currentTime/200)
    screen.blit(animationList[frame],animationRect)
    
    if pizzaRect.colliderect(animationRect):
        print(currentTime)
    
#     if pizzaRect.colliderect(pizza2Rect):
#         print("kollisjon")
    
    display()