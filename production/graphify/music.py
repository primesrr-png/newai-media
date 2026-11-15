import math, random, struct, wave
from pathlib import Path
random.seed(16)
rate=32000
duration=25
Path("public").mkdir(exist_ok=True)
with wave.open("public/bed.wav","wb") as out:
    out.setparams((1,2,rate,0,"NONE","not compressed"))
    data=bytearray()
    notes=[110,130.8128,164.8138,146.8324]
    for i in range(rate*duration):
        t=i/rate
        beat=t%0.5
        chord=notes[int(t//4)%4]
        pad=sum(math.sin(2*math.pi*chord*r*t) for r in [1,1.5,2])/3
        kick=math.sin(2*math.pi*(48*beat+3*(1-math.exp(-beat*40))))*math.exp(-beat*22)
        hat=(random.random()*2-1)*math.exp(-(t%0.25)*110)
        fade=min(1,t/0.6,(duration-t)/1.0)
        sample=(pad*.09+kick*.2+hat*.035)*max(0,fade)
        data.extend(struct.pack("<h",int(max(-1,min(1,sample))*32767)))
    out.writeframes(data)
