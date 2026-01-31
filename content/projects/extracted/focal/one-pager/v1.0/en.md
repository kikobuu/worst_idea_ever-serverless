# One Pager

### FOCAL: One Pager

> *Located at the fault boundary similar to the North China Plain and Qinling fold belt, a massive energy hub covering approximately 1 square kilometer is embedded in the fragmented landscape with crisscrossing gullies. The spherical microwave antenna at the center of the hub is the focal point of the entire facility (Focal).*

##### Core Principle: **Three-faction stronghold牵制-based** high-mobility vertical combat space design

##### Basic Attributes

|Attribute|Details|
| :-------------------------| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|Perspective|FPP|
|Type|First-person shooter (FPS)|
|Mobility|High|
|Level Area|Approximately 0.53 square kilometers|
|Maximum Crossing Distance (straight line measurement)|1.1 kilometers|
|Maximum Map Elevation Difference|96 meters|
|Compatible Game Modes|Titan vs Titan (capture points, TDM)<br />Pilot vs Pilot (traditional Titanfall PVP modes do not include the entire map area, full large map modes are similar to Battlefield's breakthrough mode & king of the hill & capture the flag, with more players compared to traditional modes)|
|PVP Mode Features|**Three teams mutually hostile**, **dynamic gameplay, increased chaos**|
|PVE Mode Features|**AI teams besieging the harvester will have greater attack angles and strategic depth**, players will be exhausted if not careful|
|Art Style|Building complex framework is brutalist with concrete + megastructural industrial facilities, while precision facilities such as antenna lenses, steam turbines, control centers are futuristic style|

##### Features

* **High altitude differences create vertical depth and Z-axis layering**
* **Spatial construction and area connections designed around high mobility**
* **Asymmetric design experience planning**

##### Overall Layout and Legend Description:

![FOCAL](https://image.baidu.com/search/down?url=https://tvax3.sinaimg.cn/large/005ZMomSgy1i9ufgjfvkvj30zk0k0wok.jpg)

```mermaid
graph LR
    %% Node definitions (translated to English)
    In1[<b>Entrance 1]
    In2[<b>Entrance 2]
    In3[<b>Entrance 3]

    A{<b>A <br>Dam Gate}
    B{<b>B <br>Command Center}
    C{<b>C <br>Substation}

    E[<b>E <br>Power Room]
    F[<b>F <br>Pump Tower]
    G[<b>G <br>Infrastructure]
  
    D((<b>D <br>Core Lens))

    %% Geometric layout logic
    %% Left entrance progression
    In1 --> A
    A --> E
    A --> F

    %% Right entrance progression
    In2 --> B
    In3 --> C
    B --> E
    B --> G
    C --> G
    C --> F

    %% Core circulation paths (curved arrows in original)
    E -.-> G
    G -.-> F
    F -.-> E

    %% Final convergence center
    E === D
    F === D
    G === D

    %% Style beautification
    style D fill:#f90,stroke:#333,stroke-width:3px style A fill:#f2f2f2,color:#333 style B fill:#f2f2f2,color:#333 style C fill:#f2f2f2,color:#333
```

‍