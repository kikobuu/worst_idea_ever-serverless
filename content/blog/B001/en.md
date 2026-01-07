# Welcome to My Blog

This is the English content of my first blog post.

## Introduction

I am testing the **markdown rendering** capabilities.

### Features

- [x] Markdown parsing
- [x] i18n support
- [x] Custom styling

Here is some code:

```javascript
console.log("Hello, World!");
```
# LD-21 Topology

```mermaid
flowchart TD
    %% --- 样式定义 ---
    classDef ground fill:#2c3e50,stroke:#f1c40f,stroke-width:2px,color:#fff
    classDef air fill:#8e44ad,stroke:#ecf0f1,stroke-width:2px,color:#fff
    classDef mech fill:#e74c3c,stroke:#333,stroke-width:2px,color:#fff,shape:hexagon
    classDef startend fill:#27ae60,stroke:#333,stroke-width:2px,color:#fff,shape:rect
    classDef landmark fill:#f39c12,stroke:#fff,stroke-width:4px,color:#000,shape:circle

    %% --- 核心流程 ---

    Start(入口连接舱):::startend -->|狭窄走廊| Entry_Zone

    %% 区域1：地面层
    subgraph Ground_Floor [Level 0: 宴会厅地面]
        Entry_Zone[入口缓冲区]:::ground
        Main_Combat[中央舞池<br>近战绞肉机]:::ground
        Phase_Cover{{相位玻璃掩体<br>Phase Glass}}:::mech
        Exit_Zone[出口大门区]:::ground
    
        Entry_Zone --> Main_Combat
        Main_Combat <--> Phase_Cover
        Main_Combat --> Exit_Zone
    end

    %% 区域2：二层回廊
    subgraph Mezzanine [Level 1: 悬空回廊]
        Balcony_Left[左侧回廊<br>狙击点]:::air
        Balcony_Right[右侧回廊<br>狙击点]:::air
        Vault_Crack(藏宝室裂隙):::air
    
        Balcony_Left <-->|空中冲刺| Balcony_Right
        Balcony_Right --> Vault_Crack
    end

    %% 宏观地标
    Pendulum((时空大摆钟<br>动态掩体)):::landmark

    %% --- 垂直交互连接 ---
  
    %% 机关定义
    Vent_L{{以太风口 A<br>左侧}}:::mech
    Vent_R{{以太风口 B<br>右侧}}:::mech
  
    %% 上升流 (Upward Flow)
    Main_Combat -->|踩踏弹射| Vent_L
    Main_Combat -->|踩踏弹射| Vent_R
    Vent_L -.->|滑翔| Balcony_Left
    Vent_R -.->|滑翔| Balcony_Right

    %% 下降流 (Downward Flow)
    Balcony_Left -.->|跳下| Main_Combat
    Balcony_Right -.->|跳下| Exit_Zone

    %% 视线关系 (虚线)
    Balcony_Left -.- Pendulum
    Main_Combat -.- Pendulum

    %% 关卡出口
    Exit_Zone --> End(引擎室前厅):::startend
```

第二版：

```mermaid
graph TD
    %% --- 样式定义 (Style Definitions) ---
    classDef safe fill:#27ae60,stroke:#2ecc71,stroke-width:3px,color:#fff,rx:5,ry:5;
    classDef ground fill:#2c3e50,stroke:#f1c40f,stroke-width:2px,color:#fff,shape:rect;
    classDef air fill:#8e44ad,stroke:#9b59b6,stroke-width:2px,color:#fff,shape:rect;
    classDef mech fill:#c0392b,stroke:#e74c3c,stroke-width:3px,color:#fff,shape:hexagon;
    classDef flank fill:#d35400,stroke:#e67e22,stroke-width:2px,color:#fff,shape:trapezoid;

    %% --- 区域节点 (Nodes) ---
  
    %% 起始区
    Start(入口连接舱<br>Intensity: Low):::safe
  
    %% 地面层 (Level 0)
    Foyer[前厅缓冲区<br>Level 0 / Int: Med]:::ground
    Main_Arena((中央舞池: 绞肉机<br>Level 0 / Int: Extreme)):::ground
    Phase_Trap[相位玻璃迷宫<br>视线诱饵区]:::ground
    Exit_Zone[出口大门<br>Level 0 / Int: High]:::ground
  
    %% 侧翼通道 (Doom Style Flank)
    Backstage[/后台维修通道<br>Level 0.5 / Int: Med/Sneaky/]:::flank

    %% 二层空域 (Level 1)
    Balcony_L[左侧狙击回廊<br>Level 1 / Int: High]:::air
    Balcony_R[右侧重火力平台<br>Level 1 / Int: High]:::air
    Chrono_Center((时空大摆钟: 空中支点<br>Level 1.5 / Int: Variable)):::air
  
    %% 隐藏区
    Secret[藏宝室裂隙<br>奖励区]:::safe

    %% --- 核心机制 (Mechanics) ---
    Vent_A{{以太风口 A<br>左侧跳板}}:::mech
    Vent_B{{以太风口 B<br>右侧跳板}}:::mech
    Vent_C{{以太风口 C<br>中央紧急逃生}}:::mech

    %% --- 路径连接 (Connections) ---

    %% 1. 入口阶段
    Start ==> Foyer
    Foyer ==>|正面突击| Main_Arena
    Foyer ==>|隐秘侧绕| Backstage

    %% 2. 地面战斗循环 (The Ground Loop)
    Main_Arena <==>|视线阻挡/技能穿透| Phase_Trap
    Phase_Trap ==> Exit_Zone
    Backstage ==>|偷袭侧翼| Phase_Trap

    %% 3. 垂直弹射 (Vertical Injection)
    Foyer -.->|喷射起步| Balcony_L
    Main_Arena -.->|逃离绞肉机| Vent_A & Vent_B
    Vent_A -.->|空中子弹时间| Balcony_L
    Vent_B -.->|空中子弹时间| Balcony_R
  
    %% 中央紧急风口 (Doom Style "Oh Shit" Button)
    Main_Arena -.->|绝境逃生| Vent_C
    Vent_C -.->|直接弹射至地标| Chrono_Center

    %% 4. 空中机动 (Air Superiority)
    Balcony_L & Balcony_R -.->|空中冲刺/二段跳| Chrono_Center
    Chrono_Center -.->|下坠攻击 Ground Slam| Main_Arena
  
    %% 5. 藏宝室回路 (No Dead Ends)
    Balcony_R ==>|高难度跳跃| Secret
    Secret -.->|单向滑梯归队| Exit_Zone

    %% 6. 最终出口
    Main_Arena ==> Exit_Zone
    Balcony_L & Balcony_R -.->|俯冲| Exit_Zone
```

‍

‍

‍

‍
