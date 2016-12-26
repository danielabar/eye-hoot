#!/usr/bin/env bash

echo "Copying top level files..."
cp index.html owl.ico docs

echo "Copying styles..."
cp -r css docs

echo "Copying scripts..."
cp -r js docs

echo "Copying sounds..."
cp -r sounds docs

echo "Copying images..."
cp -r images docs

echo "Done"
