import pygame as pg

class SpriteSheet():
    def __init__(self,image):
        self.sheet = image
    def getImage(self,frame,width,height,size,color):
        #Setter den til transparent gjennom pg.SRCALPHA
        image = pg.Surface((width,height), pg.SRCALPHA)
        #blit: image, x- and y-pos den starter på og så hvor langt den flytter seg (width and height), kalles area
        image.blit(self.sheet,(0,0), (frame*width,0,width, height))
        image = pg.transform.scale(image,(size,size))
        #Adder transparancy fordi det tar vekk den svarte fargen
#         image.set_colorkey(color)
        return image
