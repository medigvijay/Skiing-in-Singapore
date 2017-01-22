# Skiing-in-Singapore
A solution for the problem "Skiing in Singapore" hosted at http://geeks.redmart.com/2015/01/07/skiing-in-singapore-a-coding-diversion/.

##Language used is JavaScript

#Approach

Assuming the grid(skipping the first row which tell the size of the remaining grid) as a two dimensional array.

Now each cell can be thought of as a root of a tree like structure with 4 possible childs(viz eChild, wChild, nChild, sChild) which in turn can have children and so their children.




##Step 1. 
Define a generic Tree constructor(Tree)

##Step 2.
Define few methods the Tree can have(getRoot, addChildren, getHeight)

##Step 3.(populate)
Create a tree for each element in the grid with the current element as the root node.
This way we get a list(of length obtained as a product of elements of the first row of the original grid (e.g. 4x4)) of Trees.


##Step 4.(updateHeight)
Calculate and update the heights(or depths) of each tree in the tree list obtained in Step 3.

##Step 5.(getHeighest)
Find the heighest tree by comparing heights of each tree in the tree list. If two trees have same height then check their endpoints(i.e. the leaves).
