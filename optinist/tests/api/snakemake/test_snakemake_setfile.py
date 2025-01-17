import pytest

from optinist.api.snakemake.snakemake_setfile import SmkSetfile
from optinist.api.workflow.workflow import Edge, Node, NodeData, NodePosition

unique_id = "test"

node = Node(
    id="input_0",
    type="type",
    data=NodeData(
        label="label",
        param={},
        path="path",
        type="type",
        fileType="fileType",
        hdf5Path="hdf5Path",
    ),
    position=NodePosition(
        x=0,
        y=0,
    ),
    style={},
)

nodeDict = {
    "node1": node
}

edgeDict = {
    "edge1": Edge(
        id="id",
        type="type",
        animated=False,
        source="input_0",
        sourceHandle="input_0--image--ImageData",
        target="suite2p",
        targetHandle="suite2p--image--ImageData",
        style={},
    ),
}


def test_SmkSetfile_image():
    SmkSetfile.image(
        unique_id=unique_id,
        node=node,
        edgeDict=edgeDict,
        nwbfile={},
    )


def test_SmkSetfile_csv():
    SmkSetfile.csv(
        unique_id=unique_id,
        node=node,
        edgeDict=edgeDict,
        nwbfile={},
    )


def test_SmkSetfile_hdf5():
    SmkSetfile.hdf5(
        unique_id=unique_id,
        node=node,
        edgeDict=edgeDict,
        nwbfile={},
    )


def test_SmkSetfile_algo():
    SmkSetfile.algo(
        unique_id=unique_id,
        node=node,
        edgeDict=edgeDict,
        nodeDict=nodeDict,
    )
