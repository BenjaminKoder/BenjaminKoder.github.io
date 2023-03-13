import pygame as pg
import random as ran
from sys import exit
import spritesheetClass as ss
import math as m
import random as ran
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
wdw = 0

def eventListener():
    for event in pg.event.get():
        if event.type == pg.QUIT:
            pg.quit()
            exit()
        if event.type == pg.KEYDOWN:
                if event.key == pg.K_SPACE and JazzPlayer.yPos >= H-40:
#                     if JazzPlayer.left == False:
#                         JazzPlayer.state = "jumpRight"
#                     elif JazzPlayer.left:
#                         JazzPlayer.state = "jumpLeft"
                    JazzPlayer.jumping = True
                    JazzPlayer.gravity = -10
            
def display():
    pg.time.Clock().tick(fps)
    pg.display.update()

class AnimateCharacter(pg.sprite.Sprite):
    def __init__(self,imgFile,size,xPos,yPos,framesPerMovement,startState,groundH,flip):
        self.imgFile = imgFile
        super().__init__()
#         self.animationSteps = animationSteps
        self.size = size
#         self.startingFrame = startingFrame
        self.xPos = xPos
        self.yPos = yPos

        animationSS = pg.image.load(imgFile).convert_alpha()
        self.animationSS = ss.SpriteSheet(animationSS)

        self.lastUpdate = pg.time.get_ticks()
        self.animationList = []
#         self.animationCooldown = 50
        self.frame = 0
        self.state = startState
        self.left = False
        
        self.gravity = 0
        self.jumping = False
        self.acc = 0
        
        self.framesPerMovement = framesPerMovement
        self.groundH = groundH
        self.flip = flip
        self.delete = False
        

    def movement(self):
        global scroll
        keys = pg.key.get_pressed()
        if not keys[pg.K_LEFT] and not keys[pg.K_a] and not keys[pg.K_RIGHT] and not keys[pg.K_d] and not self.jumping:
            if self.left == False:
                self.state = "idle"
                if self.acc>0:
                    self.acc-=0.05
                scroll -= self.acc
            elif self.left == True:
                self.state = "idleLeft"
                if self.acc>0:
                    self.acc-=0.05
                scroll +=self.acc

        if keys[pg.K_LEFT] or keys[pg.K_a] and not self.jumping:
            if self.acc<1:
                self.acc+=0.05
            self.left = True
            self.xPos -= playerSpeedX
            self.state = "runLeft"
            scroll += self.acc
        elif keys[pg.K_RIGHT] or keys[pg.K_d] and not self.jumping:
            if self.acc<=1:
                self.acc+=0.05
            self.left = False
            self.xPos += playerSpeedX
            self.state = "runRight"
            scroll -= self.acc
                
        if self.jumping:
            if self.left == False:
                self.state = "jumpRight"
                if self.acc>0:
                    self.acc-=0.05
                scroll -=self.acc
            elif self.left:
                self.state = "jumpLeft"
                if self.acc>0:
                    self.acc-=0.05
                scroll +=self.acc
        if self.acc<0:
            self.acc = 0
#             self.yPos -= 10

    def TubaMovement(self):
        if self.flip:
            s=0
            if not JazzPlayer.left:
                s = 4+JazzPlayer.acc*8
            elif JazzPlayer.left:
                s = 1+JazzPlayer.acc*2
            self.xPos-=s
            if self.xPos+self.size <= 0:
                self.delete = True
        if not self.flip:
            s=0
            if not JazzPlayer.left:
                s = 2
            elif JazzPlayer.left:
                s = 10
            self.xPos+=s
            if self.xPos >= W:
                self.delete = True
    def movementSelected(self):
        #Mengden frames i valgt bevegelse:
        self.animationSteps = self.framesPerMovement[self.state][1]
        self.startingFrame = self.framesPerMovement[self.state][0]
#         self.frame = self.startingFrame
#         if self.frame >=len(self.animationList):
#                 self.frame = self.startingFrame
        self.animationList = []
        for i in range(self.animationSteps):
            self.animationSurf = self.animationSS.getImage(i+self.startingFrame,32,32,self.size,BLACK)
            if self.flip:
                self.animationSurf = pg.transform.flip(self.animationSurf, True, False)
            self.mask = pg.mask.from_surface(self.animationSurf)
            self.animationList.append(self.animationSurf)
            
        if self.frame >=len(self.animationList):
            self.frame = 0
        self.animationCooldown = self.framesPerMovement[self.state][2]
        
    #Hvilket nummer bevegelse:
    def animate(self):
#         print(len(self.animationList))
#         if self.yPos<H-40:
#             print(self.animationRect.y+self.size)
#             self.yPos+=self.gravity
#         print(self.yPos)
        self.animationRect = self.animationSurf.get_rect(bottomleft=(self.xPos,self.yPos))
        currentTime = pg.time.get_ticks()
#         print(self.frame)
        if currentTime - self.lastUpdate >= self.animationCooldown:
            self.frame+=1
            if self.frame >=len(self.animationList):
                self.frame = 0
            self.lastUpdate = currentTime
    #     animationRect.y+=2*m.sin(currentTime/200)
        screen.blit(self.animationList[self.frame],self.animationRect)

        if pizzaRect.colliderect(self.animationRect):
            pass
        
        #Nullstiller sakte men sikkert gravity etter hopp:
        self.gravity+=0.4
        self.yPos+=self.gravity
        if self.yPos>=H-self.groundH:
            self.yPos=H-self.groundH
            self.jumping = False
    def tubaCheckCollision(self):
        #Lage sprites med image, rect og mask for å kunne sjekke kollisjoner:
        self.JazzPlayer = pg.sprite.Sprite()
        self.JazzPlayer.image = JazzPlayer.animationSurf
        self.JazzPlayer.rect = JazzPlayer.animationRect
        self.JazzPlayer.mask = pg.mask.from_surface(self.JazzPlayer.image)
        
        self.Tuba = pg.sprite.Sprite()
        self.Tuba.image = pg.image.load(self.imgFile).convert_alpha()
        self.Tuba.rect = Tuba.animationRect
        self.Tuba.mask = pg.mask.from_surface(self.Tuba.image)

        global wdw
        if pg.sprite.collide_mask(self.Tuba,self.JazzPlayer):
            wdw+=1
#             print(wdw)



bgImages = []
for i in range(1,6):
    bgImage = pg.image.load(f"background/{i}.png").convert_alpha()
    bgWidth = bgImage.get_width()
    bgImage = pg.transform.scale(bgImage,(bgWidth*2,H))
    bgImages.append(bgImage)
bgWidth = bgImage.get_width()
#antall ganger mappet looper
mapSize = 2
mapSizeNeg = 2
def drawBg():
    global mapSize, mapSizeNeg, scroll
    #Dersom negativ scroll (altså hvor mye den forflytter seg) ganger 16 (maxfarten til et groundlayeret), blir større enn mapSize ganger bredden på bakgrunnen (1000 piksler), skal mapSize økes og dermed kartet loope igjen:
    if -scroll*14 >= mapSize*1000:
        mapSize+=1
    if scroll>=0:
        scroll = 0
#     print(-scroll*16)
#     print(mapSize*1000)
#     print(abs(scroll)*16, "and", mapSize*1000)
    #Lager bakgrunnen x mange ganger ved siden av hverandre
    for x in range(-100,mapSize,1):
        speed = 0.5
        groundVar = 0
        for image in bgImages:
            if groundVar == len(bgImages)-1:
                speed = 14
            screen.blit(image,((x*bgWidth)+scroll*speed,0))
#             if groundVar == len(bgImages)-1:
#                 print((x*bgWidth)+scroll*speed)
#                 print(x*bgWidth)
#                 print(+scroll*speed)
            speed += 1
            groundVar+=1
    #Samme logikk til venstre som til høyre:
            """
    if scroll*16 >= mapSizeNeg*1000:
        mapSizeNeg+=1
    for x in range(mapSizeNeg):
        speed = 1
        groundVar = 0
        for image in bgImages:
            if groundVar == len(bgImages)-1:
                speed = 16
            #x blir negativ fordi x-posisjonen er negativ mens den tegnes mot høyre:
            screen.blit(image,((-x*bgWidth)+scroll*speed,0))
#             if groundVar == len(bgImages)-1:
#                 print((-x*bgWidth)+scroll*speed)
            speed += 2
            groundVar+=1"""

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

frameSpeedR = 50
frameSpeedI = 500
frameSpeedJ = 250

framesPerMovementJazzP = {
    # "state" : [startFrame, numFrames, cooldown]
    "idle" : [0, 2, frameSpeedI],
    "runRight" : [2, 3, frameSpeedR],
    "runLeft" : [9, 3, frameSpeedR],
    "idleLeft" : [7,2,frameSpeedI],
    "jumpRight" : [5, 2, frameSpeedJ],
    "jumpLeft" : [12, 2, frameSpeedJ]
}

framesPerMovementTuba = {
    "runRight" : [0,3,frameSpeedR]
    }

JazzPlayer = AnimateCharacter("spritesheets/jazzplayer.png",150,W/2-75,H-40,framesPerMovementJazzP,"idle",40,False)

TubaList = []

# switch = ran.randint(1,2)
# if switch == 1:
#     Tuba = AnimateCharacter("spritesheets/tuba.png",100,-100,H-200,framesPerMovementTuba,"runRight",32,False)
# elif switch == 2:
#     Tuba = AnimateCharacter("spritesheets/tuba.png",100,W,H-200,framesPerMovementTuba,"runRight",32,True)
# TubaList.append(Tuba)

pizzaSurf = pg.image.load("pizza/1.png")
pizzaSurf = pg.transform.scale(pizzaSurf,(200,200))


lastUpdate = pg.time.get_ticks()
tubaPause = 500

while True:
    eventListener()

    drawBg()
    mx, my = pg.mouse.get_pos()

    pizzaRect = pizzaSurf.get_rect(center=(mx,my))
    screen.blit(pizzaSurf,pizzaRect)
    JazzPlayer.movement()
    JazzPlayer.movementSelected()
    JazzPlayer.animate()
    

    currentTime = pg.time.get_ticks()
    if currentTime - lastUpdate >= tubaPause:
        switch = ran.randint(1,2)
        lastUpdate = currentTime
        tubaPause = ran.randint(5000,10000)
        if switch == 1:
            Tuba = AnimateCharacter("spritesheets/tuba.png",100,-100,H-ran.randint(33,H),framesPerMovementTuba,"runRight",32,False)
        elif switch == 2:
            Tuba = AnimateCharacter("spritesheets/tuba.png",100,W,H-ran.randint(33,H),framesPerMovementTuba,"runRight",32,True)
        TubaList.append(Tuba)
        
    for Tuba in TubaList: 
        Tuba.movementSelected()
        Tuba.TubaMovement()
        Tuba.animate()
        Tuba.tubaCheckCollision()
        if Tuba.delete:
            del Tuba


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


