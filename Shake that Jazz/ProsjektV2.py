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
BLACK = (0,0,0)
playerSpeedX = 0
playerSpeedY = 0
scroll = 0

def eventListener():
    for event in pg.event.get():
        if event.type == pg.QUIT:
            pg.quit()
            exit()
            
def playerMovement():
    global scroll
    keys = pg.key.get_pressed()
    if keys[pg.K_LEFT] or keys[pg.K_a]:
        JazzPlayer.xPos-=playerSpeedX
        #Problem:
        JazzPlayer.movementSelected(4)
        if scroll >-50000:
            scroll += 1
    elif keys[pg.K_RIGHT] or keys[pg.K_d]:
        JazzPlayer.xPos+=playerSpeedX
        #Problem:
        JazzPlayer.movementSelected(1)
        if scroll <50000:
            scroll -= 1
    else:
        JazzPlayer.movementSelected(0)
            
def display():
    pg.time.Clock().tick(fps)    
    pg.display.update()

class AnimateCharacter:
    def __init__(self,imgFile,size,xPos,yPos,framePerMovementList):
        self.imgFile = imgFile
#         self.animationSteps = animationSteps
        self.size = size
#         self.startingFrame = startingFrame
        self.xPos = xPos
        self.yPos = yPos
    
        animationSS = pg.image.load(imgFile).convert_alpha()
        self.animationSS = ss.SpriteSheet(animationSS)

        self.lastUpdate = pg.time.get_ticks()
        self.animationCooldown = 200
        self.frame = 0
        self.framePerMovementList = framePerMovementList
    def movementSelected(self,movementNum):
        #Mengden frames i valgt bevegelse:
        animationSteps = self.framePerMovementList[movementNum]
        self.startingFrame = 0
        self.animationList = []
        for i in range(movementNum):
            self.startingFrame+=self.framePerMovementList[i]
            
        for i in range(animationSteps):
            self.animationSurf = self.animationSS.getImage(i+self.startingFrame,32,32,self.size,BLACK)
            self.animationList.append(self.animationSurf)
        
    #Hvilket nummer bevegelse:
    def animate(self):
        
        self.animationRect = self.animationSurf.get_rect(bottomleft=(self.xPos,self.yPos))
        currentTime = pg.time.get_ticks()
        if currentTime - self.lastUpdate >= self.animationCooldown:
            self.frame+=1
            if self.frame >=len(self.animationList):
                self.frame = 0
            self.lastUpdate = currentTime
    #     animationRect.y+=2*m.sin(currentTime/200)
        screen.blit(self.animationList[self.frame],self.animationRect)
        
        if pizzaRect.colliderect(self.animationRect):
            pass

bgImages = []
for i in range(1,6):
    bgImage = pg.image.load(f"background/{i}.png").convert_alpha()
    bgWidth = bgImage.get_width()
    bgImage = pg.transform.scale(bgImage,(bgWidth*2,H))
    bgImages.append(bgImage)
bgWidth = bgImage.get_width()
def drawBg():
    #Lager bakgrunnen x mange ganger ved siden av hverandre
    for x in range(20):
        speed = 1
        groundVar = 0
        for image in bgImages:
            if groundVar == len(bgImages)-1:
                speed = 12
            screen.blit(image,((x*bgWidth)+scroll*speed,0))
            speed += 2
            groundVar+=1
    for x in range(20):
        speed = 1
        groundVar = 0
        for image in bgImages:
            if groundVar == len(bgImages)-1:
                speed = 12
            screen.blit(image,((-x*bgWidth)+scroll*speed,0))
            speed += 2
            groundVar+=1
            
# def animation(imgFile,animationSteps,size,startingFrame):
#     global lastUpdate, animationCooldown,animationList,frame,animationRect
#     
#     animationSS = pg.image.load(imgFile).convert_alpha()
#     animationSS = ss.SpriteSheet(animationSS)
# 
#     animationList = []
#     lastUpdate = pg.time.get_ticks()
#     animationCooldown = 500
#     frame = 0
#     for i in range(animationSteps):
#         animationSurf = animationSS.getImage(i+startingFrame,32,32,size,BLACK)
#         animationList.append(animationSurf)
#     animationRect = animationSurf.get_rect(center=(W/2,H/2))

JazzPlayer = AnimateCharacter("spritesheets/jazzplayer.png",100,W/2,H-40,[2,3,2,2,3,2])

pizzaSurf = pg.image.load("pizza/1.png")
pizzaSurf = pg.transform.scale(pizzaSurf,(200,200))



while True:
    eventListener()
    
    drawBg()
    mx, my = pg.mouse.get_pos()
    
    pizzaRect = pizzaSurf.get_rect(center=(mx,my))
    screen.blit(pizzaSurf,pizzaRect)
    playerMovement()
    JazzPlayer.animate()
    
    
    display()
#     k += 1
#     if k%20 == 0:
#         frame +=1
#     if frame>=animationSteps:
#         frame = 0
#     pizza = pizzaSS.getImage(pizzaNum,32,32,500,BLACK)
#     pizzaRect = pizza.get_rect(center=(W/2,H/2))
    
    
#     pizza2Rect.x-=1
    
#     screen.blit(pizza2,pizza2Rect)
"""
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
""" 
#     if pizzaRect.colliderect(pizza2Rect):
#         print("kollisjon")
    
   