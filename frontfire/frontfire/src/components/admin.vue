<template>
<div class="layout">
    <Layout style="height: 100%">
        <Header>
            <Menu mode="horizontal" theme="dark">
                <div class='headerTitle'>眉山消防定位系统</div>
                <div class="layout-nav">
                </div>
            </Menu>
        </Header>
        <Layout>
            <Sider hide-trigger :style="{background: '#fff'}">
                <Menu theme="light" width="auto" :open-names="['1']" :active-name="currentItem" @on-select="changeItem">
                    <Submenu name="1">
                        <template slot="title">
                            报警人员列表
                        </template>
                        <div v-for="(item,index) in numberList" :key="index">
                          <MenuItem :name="index">{{item.number}}
                            <Button type="error" size="small">删除</Button>
                          </MenuItem>
                        </div>
                        <Button type="primary" style="margin-left: 40px;">新建火灾信息</Button>
                    </Submenu>
                </Menu>
            </Sider>
            <Layout style="position:relative">
                <div id="container" style="width: 100%;height: 100%"></div>
                <Card class="infoCard">
                  <p slot="title">
                      具体位置信息:
                  </p>
                  <p>"四川省成都市成华区猛追湾街道四川油气田总部机关住宅区电子科技大学继续教育学院"</p>
                </Card>
            </Layout>
        </Layout>
    </Layout>
</div>
</template>
<script>
export default {
  name: 'admin',
  data () {
    return {
      currentItem: 0,
      numberList: [{
        number: '18380266573',
        data: ''
      },{
        number: '18380266573',
        data: ''
      },{
        number: '18380266573',
        data: ''
      }]
    }
  },
  methods: {
    changeItem: (index) => {
    },
    createMap: () => {
      var map = new AMap.Map('container', {
          resizeEnable: true,
          zoom:11,
          center: [104.09659999999997, 30.67394]
      });
      var marker = new AMap.Marker({
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
          position: [104.09659999999997, 30.67394]
      });
      map.add(marker);
      map.setFitView();
    }
  },
  mounted () {
    this.createMap()
  }
}
</script>

<style scoped>
.layout{
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
}
.headerTitle{
  margin-left: 30px;
  color: #fff;
}
.infoCard{
  width: 200px;
  position: absolute;
  top: 0;
  right: 0;
}
</style>
