<template>
  <aside class="aside-container">
    <nav class="sidebar">
      <b-navbar-nav class="sidebar-nav">
        <template v-for="header in menus">
          <div class="nav-heading" :key="header.name">
            <span>{{ header.title }}</span>
          </div>
          <template v-for="menu in header.children">
            <template v-if="menu.children">
              <b-nav-item
                href="#"
                :key="`menu_${menu.name}`"
                v-b-toggle="`menu_${menu.name}_submenu`"
              >
                <i :class="menu.icon" />
                <span>{{ menu.title }}</span>

                <b-collapse :id="`menu_${menu.name}_submenu`">
                  <b-navbar-nav class="nav-child animated fadeInLeft faster">
                    <template v-for="submenu in menu.children">
                      <b-nav-item
                        :key="submenu.name"
                        :to="submenu.url">
                        <i :class="submenu.icon" />
                        <span>{{ submenu.title }}</span>
                      </b-nav-item>
                    </template>
                  </b-navbar-nav>
                </b-collapse>
              </b-nav-item>
            </template>
            <template v-else>
              <b-nav-item
                :key="menu.name"
                :to="menu.url">
                <i :class="menu.icon" />
                <span>{{ menu.title }}</span>
              </b-nav-item>
            </template>
          </template>
        </template>
      </b-navbar-nav>
    </nav>
  </aside>
</template>
<script>
import menu from '@/menu'

export default {
  computed: {
    menus () {
      return menu
    }
  }
}
</script>
