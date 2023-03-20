import pygame as pg
import random as ran
from sys import exit
import spritesheetClass as ss
import math as m
import random as ran
pg.init()

bg_Music1 = pg.mixer.Sound("Audio/Jive At Six.mp3")
bg_Music1.play(-1)

fps = 60
W = 1200
H = 600
screen = pg.display.set_mode((W,H))
pg.display.set_caption("Shake that Jazz")

scroll = -500
WHealthPerm = 10
WHealth = WHealthPerm
gameRun = True
hover = 0
score = 0
healthPrize = 2
gravityPrize = 35
gravityPower = 10
pizzaAmount = 1
pizzaPrice = 5

textList = []
bgRectList = []

RED = (255,0,0)
BLUE = (47,123,171)
DARKBLUE = (27,69,86)
LIGHTBLUE = (68,165,250)
GREEN = (0,255,0)
BLACK = (0,0,0)
YELLOW = (255,241,0)
WHITE = (105,105,105)

def eventListener():
    global gameRun, score, gravityPower
#     , healthPrize, WHealth, WHealthPerm, gravityPrize, pizzaAmount,pizzaPrice
    for event in pg.event.get():
        if event.type == pg.QUIT:
            pg.quit()
            exit()
        if event.type == pg.KEYDOWN:
                if event.key == pg.K_SPACE:
                    if JazzPlayer.yPos >= H-40 and gameRun:
                        JazzPlayer.jumping = True
                        JazzPlayer.gravity = -gravityPower
#                 if event.key == pg.K_h:
#                     if score >= healthPrize and WHealthPerm<100 and not gameRun:
#                         score-=healthPrize
#                         if healthPrize>=200:
#                             healthPrize = 200
#                         else:
#                             healthPrize*=2
#                         WHealthPerm+=10
#                         WHealth = WHealthPerm
                if event.key == pg.K_r:
                    if not gameRun:
                        restart()
                        gameRun=True
#                 if event.key == pg.K_g:
#                     if score >= gravityPrize and gravityPower<=15 and not gameRun:
#                         score-=gravityPrize
#                         gravityPrize*=2
#                         gravityPower*=1.2
#                 if event.key == pg.K_f:
#                     if score >= pizzaPrice and pizzaAmount<=30 and not gameRun:
#                         score-=pizzaPrice
#                         pizzaAmount+=1
#                         pizzaPrice+=5
                        
                        
                        
        
            
def display():
    pg.time.Clock().tick(fps)
    pg.display.update()

class AnimateCharacter(pg.sprite.Sprite):
    def __init__(self,imgFile,size,xPos,yPos,framesPerMovement,startState,groundH,flip):
        self.imgFile = imgFile
        super().__init__()
        self.size = size
        self.xPos = xPos
        self.yPos = yPos

        animationSS = pg.image.load(imgFile).convert_alpha()
        self.animationSS = ss.SpriteSheet(animationSS)

        self.lastUpdate = pg.time.get_ticks()
        self.animationList = []
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

        if (keys[pg.K_LEFT] or keys[pg.K_a]):
            if self.acc<1:
                self.acc+=0.5
            self.left = True
            self.state = "runLeft"
            scroll += self.acc
        elif (keys[pg.K_RIGHT] or keys[pg.K_d]):
            if self.acc<=1:
                self.acc+=0.5
            self.left = False
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
        if scroll>=0:
            scroll=-1000
    def TubaMovement(self):
        if self.flip:
            s=0
            if not JazzPlayer.left:
                s = (4+JazzPlayer.acc*8)*speedTuba
            elif JazzPlayer.left:
                s = (1+JazzPlayer.acc*2)*speedTuba
            self.xPos-=s
            if self.xPos+self.size <= 0:
                self.delete = True
        if not self.flip:
            s=0
            if not JazzPlayer.left:
                s = (1+JazzPlayer.acc*2)*speedTuba
            elif JazzPlayer.left:
                s = (4+JazzPlayer.acc*8)*speedTuba
            self.xPos+=s
            if self.xPos >= W:
                self.delete = True
    def movementSelected(self):
        #Mengden frames i valgt bevegelse:
        self.animationSteps = self.framesPerMovement[self.state][1]
        self.startingFrame = self.framesPerMovement[self.state][0]

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

        self.animationRect = self.animationSurf.get_rect(bottomleft=(self.xPos,self.yPos))
        currentTime = pg.time.get_ticks() 

        if currentTime - self.lastUpdate >= self.animationCooldown:
            self.frame+=1
            if self.frame >=len(self.animationList):
                self.frame = 0
            self.lastUpdate = currentTime
        screen.blit(self.animationList[self.frame],self.animationRect)
        
        #Nullstiller sakte men sikkert gravity etter hopp:
        self.gravity+=0.4
        self.yPos+=self.gravity
        if self.yPos>=H-self.groundH:
            self.yPos=H-self.groundH
            self.jumping = False
    def tubaCheckCollision(self):
        global WHealth
        #Lage sprites med image, rect og mask for å kunne sjekke kollisjoner:
        self.JazzPlayer = pg.sprite.Sprite()
        self.JazzPlayer.image = JazzPlayer.animationSurf
        self.JazzPlayer.rect = JazzPlayer.animationRect
        self.JazzPlayer.mask = pg.mask.from_surface(self.JazzPlayer.image)
        
        self.Tuba = pg.sprite.Sprite()
        self.Tuba.image = pg.image.load(self.imgFile).convert_alpha()
        self.Tuba.rect = Tuba.animationRect
        self.Tuba.mask = pg.mask.from_surface(self.Tuba.image)

        if pg.sprite.collide_mask(self.Tuba,self.JazzPlayer):
            WHealth-=2
            #Streker på kryss og tvers av skjermen:
            pg.draw.line(screen,"#ff0000",(0,0),(W,H),10)
            pg.draw.line(screen,"#ff0000",(0,H),(W,0),10)



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

    #Lager bakgrunnen x mange ganger ved siden av hverandre
    for x in range(-100,mapSize,1):
        speed = 0.5
        groundVar = 0
        for image in bgImages:
            if groundVar == len(bgImages)-1:
                speed = 14
            screen.blit(image,((x*bgWidth)+scroll*speed,0))

            speed += 1
            groundVar+=1

def drawHealthbar():
    global WHealth, gameRun
    healthRect = pg.Rect(55,55,WHealth*2,40)
    whiteRect = pg.Rect(55,55,200,40)
    bgRect = pg.Rect(50,50,210,50)
    pg.draw.rect(screen,BLACK,bgRect)
    pg.draw.rect(screen,WHITE,whiteRect)
    pg.draw.rect(screen,GREEN, healthRect)
    
    if WHealth<=0:
        gameRun = False
def createText(fontTtf,size,text,color,xPos,yPos,hoverAmplitude,bgBool):
    global hover, textList
    hover+=0.1
    font = pg.font.Font(f"Fonts/{fontTtf}",size)
    surf = font.render(text, True, color)
    rect = surf.get_rect(center = (xPos,yPos))
    if hoverAmplitude!=0:
        rect.y += hoverAmplitude*m.sin(hover)
        screen.blit(surf,rect)
    else:
        textList.append((surf,rect))
        
    if bgBool:
        bgRect = pg.Rect(rect.x-5,rect.y-5,rect.w+10,rect.h+10)
        bgRectList.append(bgRect)
        
def showTextAndButtons():
    global textList, bgRectList,score,healthPrize,WHealth, WHealthPerm, gravityPrize, gravityPower, pizzaPrice, pizzaAmount
    hovering = False
    mouse_pos = pg.mouse.get_pos()
    mouse_press = pg.mouse.get_pressed()[0]
    #Setter farge og piltype etter sjekk av kollisjon mellom mus og knapper:
    for bgRect in bgRectList:
        if bgRect.collidepoint((mouse_pos[0],mouse_pos[1])):
            pg.draw.rect(screen,LIGHTBLUE,bgRect,border_radius = 20)
            hovering = True
        else:
            pg.draw.rect(screen,DARKBLUE,bgRect,border_radius = 20)
    if hovering:
        pg.mouse.set_cursor(pg.SYSTEM_CURSOR_HAND)
    else:
        pg.mouse.set_cursor(pg.SYSTEM_CURSOR_ARROW)
            
    #Sjekker om knappene blir trykke på:
    if bgRectList[0].collidepoint((mouse_pos[0],mouse_pos[1])) and mouse_press:
        if score >= healthPrize:
            if WHealthPerm<100:
                        score-=healthPrize
                        if healthPrize>=200:
                            healthPrize = 200
                        else:
                            healthPrize*=2
                        WHealthPerm+=10
                        WHealth = WHealthPerm
            else:
                createText("Bebas_Neue/BebasNeue-Regular.ttf",50,f"MAX HEALTH",GREEN,W/2,H/2+80,0,True)
    if bgRectList[1].collidepoint((mouse_pos[0],mouse_pos[1])) and mouse_press:
        if score >= gravityPrize:
            if gravityPower<=15:
                            score-=gravityPrize
                            gravityPrize*=2
                            gravityPower*=1.2
            else:
                createText("Bebas_Neue/BebasNeue-Regular.ttf",50,f"MAX GRAVITY",RED,W/2,H/2+160,0,True)
    if bgRectList[2].collidepoint((mouse_pos[0],mouse_pos[1])) and mouse_press:
        if score >= pizzaPrice:
            if pizzaAmount<=30:
                        score-=pizzaPrice
                        pizzaAmount+=1
                        pizzaPrice+=10
            else:
                createText("Bebas_Neue/BebasNeue-Regular.ttf",50,f"MAX AMOUNT OF PIZZAS",YELLOW,W/2,H/2+240,0,True)
                 
    for text in textList:                                                                                                                                                                                                      
       screen.blit(text[0],text[1])
       

def restart():
    global tubaTimeChange, speedTuba,mapSize,mapSizeNeg,WHealth,TubaList, pizzaList
    tubaTimeChange = 0
    speedTuba = 1
    mapSize = 2
    mapSizeNeg = 2
    TubaList = []
    pizzaList = []
    
    
class Pizza(pg.sprite.Sprite):
    def __init__(self,imgFile):
        super().__init__()
        self.diameter = 100
        self.xPos = ran.randint(-1000,W-self.diameter+1000)
        self.yPos = 0
        self.frame = 0
        
        animationSS = pg.image.load(imgFile).convert_alpha()
        self.animationSS = ss.SpriteSheet(animationSS)
        self.delete = False
        
        self.lastUpdate = pg.time.get_ticks()
        self.cooldown = 40
    def animate(self):
        self.yPos+=5
        if JazzPlayer.left:
            self.xPos+=JazzPlayer.acc*6
        elif not JazzPlayer.left:
            self.xPos-=JazzPlayer.acc*6


        self.surf = self.animationSS.getImage(self.frame,32,32,self.diameter,BLACK)
        self.rect = self.surf.get_rect(bottomleft=(self.xPos,self.yPos))
        screen.blit(self.surf,self.rect)
        
        if self.yPos >= H-140:
            currentTime = pg.time.get_ticks()
            if currentTime - self.lastUpdate >= self.cooldown:
                self.lastUpdate = currentTime
                self.frame+=1
        if self.yPos>=H+100:
            self.delete = True
    
    def collidePlayer(self):
        global score
        self.JazzPlayer = pg.sprite.Sprite()
        self.JazzPlayer.image = JazzPlayer.animationSurf
        self.JazzPlayer.rect = JazzPlayer.animationRect
        self.JazzPlayer.mask = pg.mask.from_surface(self.JazzPlayer.image)
        
        self.pizza = pg.sprite.Sprite()
        self.pizza.image = self.surf
        self.pizza.rect = pizza.rect
        self.pizza.mask = pg.mask.from_surface(self.pizza.image)

            
        if pg.sprite.collide_mask(self.pizza,self.JazzPlayer):
            pizza.delete = True
            score+=1


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


pizzaList = []

pizza = Pizza("spritesheets/pizza.png")
pizzaList.append(pizza)


lastUpdate = pg.time.get_ticks()
tubaPause = 500
tubaTimeChange = 0
speedTuba = 1

def createTexts():
    global score
#     textList = []
    createText("Nunito/Nunito-VariableFont_wght.ttf",60,"Press R to restart",BLACK,W/2,H/2,0,False)
    createText("Bebas_Neue/BebasNeue-Regular.ttf",50,f"Upgrade health: {healthPrize} pizzas",BLUE,W/2,H/2+80,0,True)
    createText("Bebas_Neue/BebasNeue-Regular.ttf",50,f"Lower the gravity: {gravityPrize} pizzas",BLUE,W/2,H/2+160,0,True)
    createText("Bebas_Neue/BebasNeue-Regular.ttf",50,f"Upgrade the amount of pizzas: {pizzaPrice} pizzas",BLUE,W/2,H/2+240,0,True)
    createText("Bebas_Neue/BebasNeue-Regular.ttf",80,f"PIZZA: {score}",BLUE,W-150,100,0,False)
def transparancyLayer():
    bg = pg.Surface((W,H))
    bg = bg.convert_alpha()
    bg.fill((255,255,255,150))
    screen.blit(bg,(0,0))

createTexts()

lastUpdatePizza = pg.time.get_ticks()
pizzaPause = 1000

while True:
    eventListener()
    
    if gameRun:
        pg.mouse.set_cursor(pg.SYSTEM_CURSOR_ARROW)
        drawBg()

        JazzPlayer.movement()
        JazzPlayer.movementSelected()
        JazzPlayer.animate()
        for pizza in pizzaList:
            pizza.animate()
            pizza.collidePlayer()
            if pizza.delete:
                pizzaList.remove(pizza)

        currentTime = pg.time.get_ticks()
        if currentTime - lastUpdate >= tubaPause:
            switch = ran.randint(1,2)
            lastUpdate = currentTime
            tubaTimeChange+=500
            speedTuba+=0.02
            if tubaTimeChange>=4200:
                tubaTimeChange=4200
            tubaPause = ran.randint(5000-tubaTimeChange,10000-tubaTimeChange)
            if switch == 1:
                Tuba = AnimateCharacter("spritesheets/tuba.png",100,-100,H-ran.randint(33,H),framesPerMovementTuba,"runRight",32,False)
            elif switch == 2:
                Tuba = AnimateCharacter("spritesheets/tuba.png",100,W,H-ran.randint(33,H),framesPerMovementTuba,"runRight",32,True)
            TubaList.append(Tuba)
            
        currentTimePizza = pg.time.get_ticks()
        if currentTimePizza - lastUpdatePizza >= pizzaPause:
            for i in range(ran.randint(pizzaAmount,pizzaAmount+1)):
                pizza = Pizza("spritesheets/pizza.png")
                pizzaList.append(pizza)
            lastUpdatePizza = currentTimePizza
            
        for Tuba in TubaList: 
            Tuba.movementSelected()
            Tuba.TubaMovement()
            Tuba.animate()
            Tuba.tubaCheckCollision()
            if Tuba.delete:
                TubaList.remove(Tuba)
        drawHealthbar()
        createText("Bebas_Neue/BebasNeue-Regular.ttf",80,f"PIZZA: {score}",YELLOW,W-150,100,10,False)

        
    if not gameRun:
        drawBg()
        WHealth = WHealthPerm
        transparancyLayer()
        drawHealthbar()
        createTexts()
        showTextAndButtons()
        createText("Bebas_Neue/BebasNeue-Regular.ttf",80,"Shake that Jazz!",BLACK,W/2,H/2-150,5,False)
        textList = []
        bgRectList = []
        
        
        
        

    display()

