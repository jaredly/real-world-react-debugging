#!/usr/bin/env python

from subprocess import check_output
import os.path
import re

names="asul josefinsans league_gothic merriweathersans overpass overpass2 quicksand cabinsketch newscycle oxygen".split(' ')

css = 'https://s3.amazonaws.com/static.slid.es/fonts/{}/{}.css'
font = 'https://s3.amazonaws.com/static.slid.es/fonts/{}/{}'

for name in names:
    prefix = name
    if prefix == 'league_gothic':
        prefix = 'league'
    if os.path.exists(name + '.css'):
        print "already have", name
    else:
        check_output(['curl', '-L', '-O', css.format(prefix, name)])
    data = open(name + '.css').read()
    if name == 'league_gothic':
        files = [name + '.ttf']
    else:
        files = re.findall(name + r'-[^.]+\.ttf', data)
    for fontname in files:
        if not os.path.exists(fontname):
            check_output(['curl', '-L', '-O', font.format(prefix, fontname)])


# vim: et sw=4 sts=4
